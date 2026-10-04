import test from "node:test";
import assert from "node:assert/strict";
import {
  realpathSync,
  mkdtempSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
  existsSync,
  rmSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { dirname, resolve } from "node:path";
import { exportTemplateArtifact } from "../tools/template-artifact.mjs";

function fixture(t) {
  const parent = realpathSync.native(mkdtempSync(resolve(tmpdir(), "foundation-export-")));
  t.after(() => rmSync(parent, { recursive: true, force: true }));
  const root = resolve(parent, "source");
  mkdirSync(root);
  const write = (file, text) => {
    mkdirSync(dirname(resolve(root, file)), { recursive: true });
    writeFileSync(resolve(root, file), text);
  };
  write(
    "package.json",
    JSON.stringify({
      name: "cxsun",
      version: "0.1.9",
      scripts: {
        "mcp:connect": "node agent/connect.mjs",
        "packages:local": "bad",
        "test:consumers:registry": "bad",
        "test:consumers:upgrade": "bad",
      },
      dependencies: { "@devxcrew/platform": "file:vendor/platform.tgz" },
      devDependencies: {},
    }),
  );
  write("index.html", '<title>Cxsun</title><script src="/src/web/main.tsx"></script>');
  write(".npmrc", "//registry.npmjs.org/:_authToken=do-not-copy");
  write("src/config.ts", 'export const id = "cxsun";');
  write(
    ".env.example",
    "APP_ID=cxsun\nAPP_NAME=Cxsun\nAPP_PORT=5173\nAPP_URL=http://127.0.0.1:5173\nMCP_SERVER_SECRET=\nAPP_USER=developer\nSMTP_PASSWORD=\nSMTP_PORT=587\n",
  );
  write(".env", "MCP_SERVER_SECRET=do-not-copy");
  write("agent/connect.mjs", 'export const endpoint = "https://mcp.codexsun.com/mcp";');
  write("agent/AUDIT.md", "OLD WORKSPACE HISTORY MUST NOT COPY");
  write("tools/governance.mjs", 'export * from "../agent/connect.mjs";');
  write(
    ".devxcrew-tools.json",
    JSON.stringify({ maintenance: { changelogPath: "agent/CHANGELOG.md" } }),
  );
  const packages = { "@devxcrew/platform": "0.2.0" };
  const lock = {
    lockfileVersion: 3,
    packages: {
      "": { dependencies: packages, devDependencies: {} },
      "node_modules/@devxcrew/platform": {
        version: "0.2.0",
        resolved: "https://registry.npmjs.org/@devxcrew/platform/-/platform-0.2.0.tgz",
        integrity: "sha512-fixture",
      },
    },
  };
  writeFileSync(resolve(parent, "release-lock.json"), JSON.stringify(lock));
  const releaseManifest = resolve(parent, "release.json");
  writeFileSync(
    releaseManifest,
    JSON.stringify({
      version: 1,
      status: "approved",
      releaseId: "fixture-release",
      packages,
      lockfile: "release-lock.json",
    }),
  );
  return { root, destination: resolve(parent, "artifact"), releaseManifest, parent };
}

test("artifact export requires release pins, preserves source and generates fresh records", (t) => {
  const options = fixture(t);
  const before = readFileSync(resolve(options.root, "package.json"), "utf8");
  const preview = exportTemplateArtifact({ ...options, dryRun: true });
  assert.equal(preview.dryRun, true);
  assert.equal(existsSync(options.destination), false);
  exportTemplateArtifact(options);
  const manifest = JSON.parse(readFileSync(resolve(options.destination, "package.json"), "utf8"));
  assert.equal(manifest.dependencies["@devxcrew/platform"], "0.2.0");
  assert.equal(manifest.name, "{{APP_ID}}");
  assert.equal(manifest.scripts["packages:local"], undefined);
  assert.equal(manifest.scripts["test:consumers:registry"], undefined);
  assert.equal(manifest.scripts["test:consumers:upgrade"], undefined);
  assert.equal(existsSync(resolve(options.destination, ".env")), false);
  assert.match(readFileSync(resolve(options.destination, "index.html"), "utf8"), /{{APP_NAME}}/);
  assert.equal(
    readFileSync(resolve(options.destination, ".npmrc"), "utf8"),
    "install-strategy=hoisted\nlegacy-peer-deps=true\n",
  );
  assert.doesNotMatch(
    readFileSync(resolve(options.destination, "agent/AUDIT.md"), "utf8"),
    /OLD WORKSPACE/,
  );
  assert.match(
    readFileSync(resolve(options.destination, "agent/CHANGELOG.md"), "utf8"),
    /^### \[v 0\.1\.0\] \d{4}-\d{2}-\d{2} \d{1,2}:\d{2} (?:am|pm) - Foundation application$/m,
  );
  assert.match(
    readFileSync(resolve(options.destination, ".env.example"), "utf8"),
    /APP_PORT=\{\{APP_PORT\}\}/,
  );
  assert.equal(readFileSync(resolve(options.root, "package.json"), "utf8"), before);
  assert.throws(() => exportTemplateArtifact(options), /new artifact/);
});

test("artifact export rejects missing pins and private lock artifacts before writing", (t) => {
  const options = fixture(t);
  writeFileSync(
    options.releaseManifest,
    JSON.stringify({
      version: 1,
      status: "approved",
      releaseId: "bad",
      packages: {},
      lockfile: "release-lock.json",
    }),
  );
  assert.throws(() => exportTemplateArtifact(options), /Missing exact/);
  assert.equal(existsSync(options.destination), false);
  writeFileSync(
    options.releaseManifest,
    JSON.stringify({
      version: 1,
      status: "approved",
      releaseId: "bad",
      packages: { "@devxcrew/platform": "0.2.0" },
      lockfile: "release-lock.json",
    }),
  );
  const lockPath = resolve(options.parent, "release-lock.json");
  const lock = JSON.parse(readFileSync(lockPath, "utf8"));
  lock.packages["node_modules/@devxcrew/platform"].resolved = "file:vendor/private.tgz";
  writeFileSync(lockPath, JSON.stringify(lock));
  assert.throws(() => exportTemplateArtifact(options), /Non-registry release artifact/);
  assert.equal(existsSync(options.destination), false);
});

test("artifact preserves live verification and email command targets", (t) => {
  const options = fixture(t);
  const path = resolve(options.root, "package.json");
  const manifest = JSON.parse(readFileSync(path, "utf8"));
  manifest.scripts["test:live"] = "node --env-file=.env tools/live-identity-check.mjs";
  manifest.scripts["email:check"] = "node --env-file=.env tools/email-check.mjs";
  writeFileSync(path, JSON.stringify(manifest));
  for (const file of ["live-identity-check.mjs", "email-check.mjs"])
    writeFileSync(resolve(options.root, "tools", file), "export {};\n");
  exportTemplateArtifact(options);
  const generated = JSON.parse(readFileSync(resolve(options.destination, "package.json"), "utf8"));
  for (const [script, file] of [
    ["test:live", "live-identity-check.mjs"],
    ["email:check", "email-check.mjs"],
  ]) {
    assert.equal(generated.scripts[script], manifest.scripts[script]);
    assert.equal(existsSync(resolve(options.destination, "tools", file)), true);
  }
});
