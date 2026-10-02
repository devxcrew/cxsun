import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, loadEnv } from "vite";
import { readConfig } from "./src/config/environment.js";

export default defineConfig(({ mode }) => {
  const env = { ...loadEnv(mode, process.cwd(), ""), ...process.env };
  const config = readConfig(env);
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src/web", import.meta.url)),
        "@codexsun/ui/tokens": fileURLToPath(
          new URL("../../shared/ui/src/tokens/index.ts", import.meta.url),
        ),
      },
      dedupe: ["react", "react-dom"],
    },
    server: {
      host: config.host,
      port: config.webPort,
      strictPort: true,
      watch: { ignored: ["**/src-tauri/**"] },
      proxy: { "/api": `http://${config.host}:${config.port}` },
    },
    build: { outDir: "dist/web" },
  };
});
