import assert from "node:assert/strict";
import { once } from "node:events";
import { createServer } from "node:http";
import { mkdtempSync, rmSync, existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { resolve } from "node:path";
import test from "node:test";
import { startDevelopment } from "../tools/dev.mjs";
import { refreshGovernance } from "../tools/governance.mjs";

test("development starts before slow governance responds and continues after failure", async (t) => {
  const root = mkdtempSync(resolve(tmpdir(), "cxsun-governance-"));
  const server = createServer(() => {});
  await new Promise((done) => server.listen(0, "127.0.0.1", done));
  t.after(() => {
    server.closeAllConnections();
    server.close();
    rmSync(root, { recursive: true, force: true });
  });
  const env = {
    ...process.env,
    MCP_SERVER_URL: `http://127.0.0.1:${server.address().port}/mcp`,
    MCP_SERVER_SECRET: "test-secret",
    APP_ID: "cxsun",
    APP_USER: "developer",
  };
  const { child, governance } = startDevelopment({
    root,
    env,
    command: process.execPath,
    args: ["-e", "console.log('APP_READY')"],
    stdio: ["ignore", "pipe", "pipe"],
  });
  let settled = false;
  void governance.then(() => {
    settled = true;
  });
  const output = [];
  child.stdout.on("data", (chunk) => output.push(chunk.toString()));
  const [code] = await once(child, "exit");
  assert.equal(code, 0);
  assert.match(output.join(""), /APP_READY/);
  assert.equal(settled, false);
  assert.equal(await governance, false);
  assert.equal(existsSync(resolve(root, ".cache/governance/instructions.json")), false);
});

test("missing MCP configuration is advisory and creates no instruction cache", async (t) => {
  const root = mkdtempSync(resolve(tmpdir(), "cxsun-governance-missing-"));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  assert.equal(await refreshGovernance({}, root), false);
  assert.equal(existsSync(resolve(root, ".cache/governance/instructions.json")), false);
});
