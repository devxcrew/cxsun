import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, readFileSync, readdirSync, realpathSync, writeFileSync } from "node:fs";
import { resolve, relative, sep } from "node:path";
import { parseEnv } from "node:util";
import { DatabaseSync } from "node:sqlite";
import { connectGovernance } from "../agent/connect.mjs";

assert.ok(
  process.versions.node.startsWith("26."),
  "Use the verified Node 26 runtime for this acceptance check.",
);
const root = resolve(import.meta.dirname, "..");
const npmCli = process.env.npm_execpath;
if (!npmCli || process.argv.length !== 3)
  throw new Error("Run npm run test:consumers:upgrade -- <local-consumer-receipt>.");
const receipt = JSON.parse(readFileSync(resolve(process.argv[2]), "utf8"));
assert.equal(receipt.status, "local-rehearsal-passed");
assert.equal(receipt.results.length, 2);
const cache = realpathSync.native(resolve(root, ".cache"));
const targets = receipt.results.map(({ destination }) => realpathSync.native(destination));
assert.equal(new Set(targets).size, 2);
for (const target of targets) {
  const path = relative(cache, target);
  assert.ok(
    path.startsWith("local-consumers-") && !path.startsWith("..") && path.includes(sep),
    "Only this application's disposable local consumer fixtures may be upgraded.",
  );
}
const release = JSON.parse(readFileSync(resolve(root, "package.json"), "utf8"));
const registryLock = JSON.parse(readFileSync(resolve(root, "package-lock.json"), "utf8"));
for (const [path, entry] of Object.entries(registryLock.packages)) {
  if (path)
    assert.ok(
      entry.resolved?.startsWith("https://registry.npmjs.org/") &&
        entry.integrity?.startsWith("sha512-"),
    );
}
const credentials = { ...parseEnv(readFileSync(resolve(root, ".env"), "utf8")), ...process.env };
const results = [];
for (const target of targets) {
  const manifestPath = resolve(target, "package.json");
  const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
  await connectGovernance({ ...credentials, APP_ID: manifest.name });
  const before = snapshot(target);
  const dataBefore = databaseFingerprint(target);
  const previousPlatform = manifest.dependencies["@devxcrew/platform"];
  manifest.dependencies = { ...release.dependencies };
  manifest.devDependencies = { ...release.devDependencies };
  const lock = structuredClone(registryLock);
  lock.name = manifest.name;
  lock.version = manifest.version;
  Object.assign(lock.packages[""], {
    name: manifest.name,
    version: manifest.version,
    dependencies: manifest.dependencies,
    devDependencies: manifest.devDependencies,
  });
  writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + "\n");
  writeFileSync(resolve(target, "package-lock.json"), JSON.stringify(lock, null, 2) + "\n");
  for (const args of [
    ["ci", "--ignore-scripts", "--no-audit", "--no-fund"],
    ["run", "verify"],
    ["run", "packages:check"],
    ["run", "db:check"],
  ])
    run(args, target);
  assert.deepEqual(
    snapshot(target),
    before,
    "Upgrade must preserve owned source and configuration.",
  );
  assert.equal(
    databaseFingerprint(target),
    dataBefore,
    "Upgrade must preserve the existing SQLite schema and every stored row.",
  );
  run(["run", "test:live"], target);
  results.push({
    id: manifest.name,
    previousPlatform,
    platform: manifest.dependencies["@devxcrew/platform"],
    registryInstallation: "passed",
    verify: "passed",
    sourceAndConfigurationPreserved: "passed",
    existingSqlitePreserved: "passed",
    livePortalReads: "passed",
  });
}
writeFileSync(
  resolve(root, "agent/UPGRADE-CONSUMERS.json"),
  JSON.stringify(
    {
      date: new Date().toISOString(),
      status: "candidate-to-registry-upgrade-passed",
      results,
      scope:
        "Two disposable local candidates upgraded to the first registry foundation. Future releases require their own migration verification.",
    },
    null,
    2,
  ) + "\n",
);
console.info(
  "Both candidate-to-registry upgrades preserved source, configuration and SQLite and passed live portal checks.",
);

function snapshot(target) {
  const hashes = {};
  for (const owner of ["src", "public", "tests", "tools", ".env", "agent"]) walk(owner);
  return hashes;
  function walk(path) {
    const absolute = resolve(target, path);
    if (!existsSync(absolute)) return;
    const entries = readdirIfDirectory(absolute);
    if (entries)
      for (const entry of entries) {
        assert.ok(!entry.isSymbolicLink(), "Fixture sources must not contain symlinks.");
        walk(`${path}/${entry.name}`);
      }
    else hashes[path] = createHash("sha256").update(readFileSync(absolute)).digest("hex");
  }
}

function databaseFingerprint(target) {
  const config = parseEnv(readFileSync(resolve(target, ".env"), "utf8"));
  const path = resolve(target, config.DB_SQLITE_PATH);
  assert.equal(
    path,
    resolve(target, "storage/identity.sqlite"),
    "Use only the fixture-owned SQLite database.",
  );
  const database = new DatabaseSync(path, { readOnly: true });
  try {
    const schema = database
      .prepare("SELECT type, name, tbl_name, sql FROM sqlite_master ORDER BY type, name")
      .all();
    const tables = schema
      .filter((row) => row.type === "table")
      .map(({ name }) => {
        const quoted = '"' + name.replaceAll('"', '""') + '"';
        const rows = database
          .prepare(`SELECT * FROM ${quoted}`)
          .all()
          .map((row) => JSON.stringify(row))
          .sort();
        return { name, rows };
      });
    return createHash("sha256").update(JSON.stringify({ schema, tables })).digest("hex");
  } finally {
    database.close();
  }
}

function readdirIfDirectory(path) {
  try {
    return readdirSync(path, { withFileTypes: true });
  } catch (error) {
    if (error.code === "ENOTDIR") return null;
    throw error;
  }
}

function run(args, cwd) {
  console.info(`Upgrade consumer: npm ${args.slice(0, 2).join(" ")}`);
  const result = spawnSync(process.execPath, [npmCli, ...args], {
    cwd,
    encoding: "utf8",
    windowsHide: true,
    timeout: args[0] === "ci" ? 600_000 : 180_000,
  });
  if (result.status !== 0) throw new Error((result.stdout + result.stderr).slice(-4000));
}
