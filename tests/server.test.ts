import assert from "node:assert/strict";
import { test } from "node:test";
import { createApp } from "../src/server/app.js";
import { readConfig } from "../src/config/environment.js";

test("Fastify exposes platform metadata and rejects missing API routes", async () => {
  const app = await createApp();
  try {
    const health = await app.inject("/api/health");
    assert.equal(health.statusCode, 200);
    assert.equal(health.json().status, "ok");
    const platform = (await app.inject("/api/platform")).json();
    assert.equal(platform.name, "Cxsun");
    assert.equal(
      platform.modules.filter((module: { status: string }) => module.status === "active").length,
      1,
    );
    const missing = await app.inject("/api/missing");
    assert.equal(missing.statusCode, 404);
    assert.equal(missing.json().error, "API route not found");
    const packages = (await app.inject("/api/packages")).json();
    assert.ok(packages.some((entry: { name: string }) => entry.name === "fastify"));
    assert.ok(!packages.some((entry: { name: string }) => entry.name === "express"));
  } finally {
    await app.close();
  }
});
test("startup rejects invalid port configuration", () => {
  for (const port of ["0", "65536", "abc", "4100.5", ""])
    assert.throws(() => readConfig({ PORT: port }), /PORT/);
});
