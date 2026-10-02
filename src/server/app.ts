import Fastify from "fastify";
import cookie from "@fastify/cookie";
import cors from "@fastify/cors";
import staticFiles from "@fastify/static";
import { existsSync, readFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { modules } from "../config/modules.js";
import { readConfig } from "../config/environment.js";
import { platformSchema } from "../contracts/platform.js";

export async function createApp(webDirectory?: string, logger = false) {
  const app = Fastify({ logger });
  await app.register(cookie);
  await app.register(cors, { origin: false });
  app.get("/api/health", () => ({
    status: "ok",
    service: "cxsun",
    uptimeSeconds: Math.floor(process.uptime()),
  }));
  app.get("/api/platform", () =>
    platformSchema.parse({ name: "Cxsun", version: "0.1.0", modules }),
  );
  app.get("/api/packages", () => {
    const manifest = JSON.parse(readFileSync(resolve("package.json"), "utf8"));
    return Object.entries({ ...manifest.dependencies, ...manifest.devDependencies }).map(
      ([name, version]) => ({
        name,
        version,
        scope: name in manifest.dependencies ? "runtime" : "development",
      }),
    );
  });
  app.get("/api/services", () => {
    const config = readConfig();
    return [
      { name: "HTTP server", status: "running", detail: "Fastify" },
      {
        name: "Database",
        status: config.databaseEnabled ? "configured" : "not configured",
        detail: "MariaDB / Kysely",
      },
      {
        name: "Queue",
        status: config.redisUrl ? "configured" : "not configured",
        detail: "BullMQ / Redis",
      },
      {
        name: "Mail",
        status: config.smtpHost ? "configured" : "not configured",
        detail: "SMTP / IMAP / POP3",
      },
      {
        name: "Tenant access",
        status: "not implemented",
        detail: "Authentication and isolation require implementation",
      },
    ];
  });
  const hasWeb = Boolean(webDirectory && existsSync(join(webDirectory, "index.html")));
  if (webDirectory && hasWeb) await app.register(staticFiles, { root: webDirectory });
  app.setNotFoundHandler((request, reply) => {
    if (request.url === "/api" || request.url.startsWith("/api/"))
      return reply.code(404).send({ error: "API route not found" });
    if (
      hasWeb &&
      request.method === "GET" &&
      request.headers.accept?.includes("text/html") &&
      !request.url.split("?")[0].includes(".")
    )
      return reply.sendFile("index.html");
    return reply.code(404).send({ error: "Not found" });
  });
  return app;
}
