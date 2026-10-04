import assert from "node:assert/strict";
import { spawn, spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import { resolve, dirname, relative } from "node:path";
import { randomUUID, createHash } from "node:crypto";
import { gunzipSync } from "node:zlib";
import { parseEnv } from "node:util";
import { connectGovernance } from "../agent/connect.mjs";

const root = resolve(import.meta.dirname, "..");
const npmCli = process.env.npm_execpath;
if (!npmCli) throw new Error("Run through npm run test:consumers.");
const local = parseEnv(await readFile(resolve(root, ".env"), "utf8"));
const environment = { ...local, ...process.env };
const runRoot = resolve(root, ".cache", `local-consumers-${randomUUID()}`);
const source = resolve(runRoot, "artifact");
await mkdir(source, { recursive: true });
const inventory = [];
for (const directory of ["src", "public", "tests"]) await collect(directory);
for (const file of [
  "tsconfig.json", "tsconfig.server.json", "vite.config.ts", "eslint.config.js",
  "index.html", ".npmrc", ".gitignore", ".env.example", ".devxcrew-tools.json", "agent/connect.mjs",
]) await copy(file);
for (const entry of await readdir(resolve(root, "tools"))) {
  if (entry.endsWith(".mjs") && !["local-consumer-check.mjs", "shared-packages.mjs", "platform-package.mjs", "template-artifact.mjs"].includes(entry))
    await copy(`tools/${entry}`);
}
const manifest = JSON.parse(await readFile(resolve(root, "package.json"), "utf8"));
manifest.name = "{{APP_ID}}";
delete manifest.repository;
for (const script of ["packages:local", "packages:npm", "packages:platform", "test:consumers"])
  delete manifest.scripts[script];
for (const name of ["@devxcrew/platform", "@devxcrew/email"])
  manifest.dependencies[name] = (await installedMetadata(name)).version;
await writeFile(resolve(source, "package.json"), JSON.stringify(manifest, null, 2));
inventory.push("package.json");
await mkdir(resolve(source, "agent"), { recursive: true });
await writeFile(resolve(source, "agent/CHANGELOG.md"), `# Changelog\n\n## Version State\n\nCurrent version: ${manifest.version}\n\nRelease tag: v-${manifest.version}\n\nChangelog label: v ${manifest.version}\n\n## v-${manifest.version}\n\n### [v ${manifest.version}] 2026-10-04 12:00 pm - Initial local foundation consumer\n\n- Generated from local packed artifacts.\n`);
inventory.push("agent/CHANGELOG.md");
await writeFile(resolve(source, ".foundation-template.json"), JSON.stringify({
  version: 1, freshAgentRecords: true, profile: "local-development-rehearsal", files: inventory,
}));
const artifacts = await Promise.all([
  ["@devxcrew/core-framework", ".cache/shared-packages"],
  ["@devxcrew/react-ui", ".cache/shared-packages"],
  ["@devxcrew/tools", ".cache/shared-packages"],
  ["@devxcrew/platform", "vendor"], ["@devxcrew/email", "vendor"],
].map(async ([name, folder]) => resolve(root, folder,
  `${name.slice(1).replace("/", "-")}-${(await installedMetadata(name)).version}.tgz`)));
const results = [];
for (const [id, name, port] of [["foundation-proof-a", "Foundation Proof A", 5191], ["foundation-proof-b", "Foundation Proof B", 5192]]) {
  const destination = resolve(runRoot, id);
  await connectGovernance({ ...environment, APP_ID: id });
  run(["exec", "--", "devxcrew-tools", "app:create", "--source", source,
    "--destination", destination, "--id", id, "--name", name,
    "--port", String(port), "--url", `http://127.0.0.1:${port}`], root);
  const generated = parseEnv(await readFile(resolve(destination, ".env.example"), "utf8"));
  const childEnvironment = { ...generated, ...process.env, APP_ID: id, APP_NAME: name,
    APP_PORT: String(port), APP_URL: `http://127.0.0.1:${port}` };
  // Rehearse unpublished artifacts with the verified third-party lock, outside the registry template.
  const inheritedLock = JSON.parse(await readFile(resolve(root, "package-lock.json"), "utf8"));
  inheritedLock.name = id;
  inheritedLock.packages[""].name = id;
  inheritedLock.packages[""].dependencies = { ...manifest.dependencies };
  inheritedLock.packages[""].devDependencies = { ...manifest.devDependencies };
  for (const artifact of artifacts) {
    const bytes = await readFile(artifact);
    const metadata = packageMetadata(bytes);
    const key = `node_modules/${metadata.name}`;
    const previous = inheritedLock.packages[key];
    assert.ok(previous, `Verified lock must include ${metadata.name}`);
    inheritedLock.packages[key] = { ...previous, version: metadata.version,
      resolved: `file:${relative(destination, artifact).replaceAll("\\", "/")}`,
      integrity: `sha512-${createHash("sha512").update(bytes).digest("base64")}` };
    for (const field of ["dependencies", "optionalDependencies", "peerDependencies", "peerDependenciesMeta", "engines", "bin"]) {
      delete inheritedLock.packages[key][field];
      if (metadata[field]) inheritedLock.packages[key][field] = metadata[field];
    }
  }
  await writeFile(resolve(destination, "package-lock.json"), JSON.stringify(inheritedLock, null, 2));
  const childManifest = JSON.parse(await readFile(resolve(destination, "package.json"), "utf8"));
  const childLock = JSON.parse(await readFile(resolve(destination, "package-lock.json"), "utf8"));
  for (const section of ["dependencies", "devDependencies"]) {
    for (const packageName of Object.keys(childManifest[section] ?? {})) {
      if (!packageName.startsWith("@devxcrew/")) continue;
      const packageVersion = childLock.packages[`node_modules/${packageName}`].version;
      childManifest[section][packageName] = packageVersion;
      childLock.packages[""][section][packageName] = packageVersion;
    }
  }
  // Keep exact consumer contracts; npm supplies the real local tarball resolution and integrity.
  await writeFile(resolve(destination, "package.json"), JSON.stringify(childManifest, null, 2));
  await writeFile(resolve(destination, "package-lock.json"), JSON.stringify(childLock, null, 2));
  run(["ci", "--ignore-scripts", "--prefer-offline", "--no-audit", "--no-fund"], destination, childEnvironment);
  run(["run", "verify"], destination, childEnvironment);
  run(["run", "packages:check"], destination, childEnvironment);
  const fixtureEnvironment = { ...generated, APP_MODE: "production",
    DB_SQLITE_PATH: resolve(destination, "storage/identity.sqlite") };
  for (const role of ["USER", "ADMIN", "SUPER_ADMIN"]) {
    fixtureEnvironment[`IDENTITY_SEED_${role}_EMAIL`] = `${role.toLowerCase()}@example.test`;
    fixtureEnvironment[`IDENTITY_SEED_${role}_NAME`] = `${name} ${role}`;
    fixtureEnvironment[`IDENTITY_SEED_${role}_PASSWORD`] = `${randomUUID()}!Aa123`;
  }
  await writeFile(resolve(destination, ".env"), Object.entries(fixtureEnvironment)
    .map(([key, value]) => `${key}=${value}`).join("\n") + "\n");
  run(["run", "db:setup"], destination, { ...childEnvironment, ...fixtureEnvironment });
  run(["run", "test:live"], destination, { ...childEnvironment, ...fixtureEnvironment });
  assert.equal(generated.APP_ID, id);
  assert.equal(generated.APP_PORT, String(port));
  assert.equal(generated.APP_URL, `http://127.0.0.1:${port}`);
  results.push({ id, destination, verify: "passed", packageBoundaries: "passed",
    liveSqlite: "passed", profile: "local-packed-artifacts" });
  console.info(`${id}: independent local artifact installation, full verification and package boundaries passed.`);
}
await verifyApplicationIsolation(results);
await writeFile(resolve(runRoot, "results.json"), JSON.stringify({
  date: new Date().toISOString(), status: "local-rehearsal-passed", results, crossAppSessionDenial: "passed",
  limitation: "Unpublished packed artifacts. This is not released registry or production acceptance.",
}, null, 2));
console.info("Two local generated consumers passed. Registry release acceptance remains separate.");

async function collect(directory) {
  if (!existsSync(resolve(root, directory))) return;
  for (const entry of await readdir(resolve(root, directory), { withFileTypes: true })) {
    const file = `${directory}/${entry.name}`;
    if (/^tests\/template.*\.test\.mjs$/.test(file)) continue;
    if (entry.isSymbolicLink()) throw new Error("Consumer artifact cannot contain symlinks.");
    if (entry.isDirectory()) await collect(file);
    else await copy(file);
  }
}

async function copy(file) {
  const destination = resolve(source, file);
  await mkdir(dirname(destination), { recursive: true });
  let content = await readFile(resolve(root, file), "utf8");
  content = content.replaceAll("http://127.0.0.1:5173", "{{APP_URL}}")
    .replaceAll("http://localhost:5173", "{{APP_URL}}")
    .replaceAll("5173", "{{APP_PORT}}")
    .replaceAll("Cxsun", "{{APP_NAME}}")
    .replaceAll("cxsun", "{{APP_ID}}");
  await writeFile(destination, content);
  inventory.push(file);
}

function run(args, cwd, env = process.env) {
  console.info(`Local consumer: npm ${args.slice(0, 2).join(" ")}`);
  const result = spawnSync(process.execPath, [npmCli, ...args], {
    cwd, env, encoding: "utf8", windowsHide: true, timeout: args[0] === "ci" ? 300_000 : 180_000,
  });
  if (result.status !== 0) {
    console.error((result.stdout ?? "").slice(-4000));
    console.error((result.stderr ?? "").slice(-2000));
    throw new Error(`Local consumer command failed: npm ${args.slice(0, 2).join(" ")}`);
  }
}

function packageMetadata(bytes) {
  const archive = gunzipSync(bytes);
  for (let offset = 0; offset + 512 <= archive.length;) {
    const name = archive.subarray(offset, offset + 100).toString().split("\0")[0];
    const size = Number.parseInt(archive.subarray(offset + 124, offset + 136).toString(), 8);
    if (!name) break;
    assert.ok(Number.isSafeInteger(size) && size >= 0, "Invalid packed artifact header.");
    if (name === "package/package.json")
      return JSON.parse(archive.subarray(offset + 512, offset + 512 + size).toString());
    offset += 512 + Math.ceil(size / 512) * 512;
  }
  throw new Error("Packed artifact must contain package/package.json.");
}

async function installedMetadata(name) {
  return JSON.parse(await readFile(resolve(root, "node_modules", name, "package.json"), "utf8"));
}

async function verifyApplicationIsolation(consumers) {
  const configurations = await Promise.all(consumers.map(({ destination }) =>
    readFile(resolve(destination, ".env"), "utf8").then(parseEnv)));
  const servers = consumers.map(({ destination }, index) => spawn(process.execPath,
    ["--env-file=.env", "dist/api/index.js"], {
      cwd: destination, env: { ...process.env, ...configurations[index], APP_MODE: "production" },
      windowsHide: true, stdio: "ignore",
    }));
  try {
    for (const port of [5191, 5192]) {
      const deadline = Date.now() + 10_000;
      while (true) {
        try {
          const response = await fetch(`http://127.0.0.1:${port}/health/ready`);
          if (response.status === 200) break;
        } catch { /* Wait only for this rehearsal's bounded server startup. */ }
        if (Date.now() >= deadline) throw new Error("Generated consumer startup timed out.");
        await new Promise(done => setTimeout(done, 100));
      }
    }
    const first = parseEnv(await readFile(resolve(consumers[0].destination, ".env"), "utf8"));
    const origin = "http://127.0.0.1:5191";
    const login = await fetch(`${origin}/api/v1/identity/user/sessions`, {
      method: "POST", headers: { "content-type": "application/json", origin },
      body: JSON.stringify({ email: first.IDENTITY_SEED_USER_EMAIL,
        password: first.IDENTITY_SEED_USER_PASSWORD, tenantId: "default" }),
    });
    assert.equal(login.status, 201);
    const cookie = login.headers.get("set-cookie")?.split(";")[0];
    assert.ok(cookie);
    const second = await fetch("http://127.0.0.1:5192/api/v1/identity/user/profile", {
      headers: { cookie },
    });
    assert.equal(second.status, 401, "A session must not authenticate in another app's SQLite database.");
    console.info("Separate generated SQLite databases and cross-app session denial passed.");
  } finally {
    for (const server of servers) server.kill();
  }
}
