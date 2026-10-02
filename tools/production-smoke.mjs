import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";
import { createApp } from "../dist/server/server/app.js";

const app = await createApp(fileURLToPath(new URL("../dist/web", import.meta.url)));
try {
  await app.listen({ host: "127.0.0.1", port: 0 });
  const address = app.server.address();
  assert.ok(address && typeof address !== "string");
  const base = `http://127.0.0.1:${address.port}`;
  const page = await fetch(base);
  assert.equal(page.status, 200);
  const html = await page.text();
  const asset = html.match(/src="([^"]+\.js)"/)[1];
  const bundle = await fetch(base + asset);
  assert.equal(bundle.status, 200);
  await bundle.arrayBuffer();
  assert.equal(
    (await fetch(`${base}/workspace`, { headers: { accept: "text/html" } })).status,
    200,
  );
  assert.equal((await fetch(`${base}/api/missing`)).status, 404);
  assert.equal((await fetch(`${base}/assets/missing.js`)).status, 404);
  assert.equal((await (await fetch(`${base}/api/health`)).json()).status, "ok");
  console.info("Production server, assets, SPA routes, and API boundaries passed.");
} finally {
  app.server.closeAllConnections();
  await app.close();
}
