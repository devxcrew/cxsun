import { spawnSync } from "node:child_process";
import { cpSync, existsSync, mkdirSync, mkdtempSync, readFileSync } from "node:fs";
import { resolve, join } from "node:path";

const root = process.cwd();
const cli = process.env.npm_execpath;
if (!cli) throw new Error("Run npm run test:foundation:standalone.");
const cache = resolve(root, ".cache");
mkdirSync(cache, { recursive: true });
const destination = mkdtempSync(join(cache, "foundation-consumer-"));
for (const directory of ["src", "tests", "tools", "vendor", "agent"])
  cpSync(resolve(root, directory), resolve(destination, directory), { recursive: true });
if (existsSync(resolve(root, "public")))
  cpSync(resolve(root, "public"), resolve(destination, "public"), { recursive: true });
for (const file of [
  "package.json",
  "package-lock.json",
  ".npmrc",
  ".gitignore",
  ".devxcrew-tools.json",
  "tsconfig.json",
  "tsconfig.server.json",
  "vite.config.ts",
  "eslint.config.js",
  "index.html",
])
  cpSync(resolve(root, file), resolve(destination, file));
const manifest = JSON.parse(readFileSync(resolve(destination, "package.json"), "utf8"));
cpSync(resolve(root, ".env.example"), resolve(destination, ".env"));
for (const owner of ["framework", "platform"])
  if (!/^file:vendor\/[a-z0-9.-]+\.tgz$/.test(manifest.dependencies[`@devxcrew/${owner}`]))
    throw new Error("The standalone rehearsal requires recorded foundation snapshots.");
for (const args of [
  ["ci", "--offline", "--ignore-scripts"],
  ["run", "verify"],
]) {
  const result = spawnSync(process.execPath, [cli, ...args], {
    cwd: destination,
    stdio: "inherit",
    windowsHide: true,
  });
  if (result.status !== 0)
    throw new Error(
      `Standalone foundation rehearsal failed at ${args[0]}. Fixture: ${destination}`,
    );
}
console.info(
  `Standalone foundation verification passed without sibling source imports. Fixture: ${destination}`,
);
