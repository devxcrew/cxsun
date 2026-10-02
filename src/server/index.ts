import { fileURLToPath } from "node:url";
import { readConfig } from "../config/environment.js";
import { createApp } from "./app.js";

const config = readConfig();
const webDirectory = fileURLToPath(new URL("../../web/", import.meta.url));
const server = await createApp(webDirectory, true);
try {
  await server.listen({ port: config.port, host: config.host });
} catch (error) {
  server.log.error(error);
  process.exitCode = 1;
}

async function shutdown() {
  const timeout = setTimeout(() => process.exit(1), 10_000).unref();
  await server.close();
  clearTimeout(timeout);
}
process.once("SIGINT", shutdown);
process.once("SIGTERM", shutdown);
