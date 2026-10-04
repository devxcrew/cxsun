import { readFileSync, mkdirSync } from "node:fs";
import { resolve, basename } from "node:path";
import { spawnSync } from "node:child_process";

const app = resolve(import.meta.dirname, "..");
const shared = process.env.CODEXSUN_SHARED_ROOT
  ? resolve(process.env.CODEXSUN_SHARED_ROOT)
  : resolve(app, "../../shared");
const source = resolve(shared, "platform");
const manifest = JSON.parse(readFileSync(resolve(source, "package.json"), "utf8"));
if (manifest.name !== "@devxcrew/platform")
  throw new Error("Expected the Platform Core package source.");
if (!process.env.npm_execpath)
  throw new Error("Run this command through npm run packages:platform.");
const vendor = resolve(app, "vendor");
mkdirSync(vendor, { recursive: true });
run(["run", "build"], source);
const result = run(
  ["pack", "--ignore-scripts", "--json", "--pack-destination", vendor],
  source,
  true,
);
const packed = JSON.parse(result);
const { filename } = Array.isArray(packed) ? packed[0] : packed["@devxcrew/platform"];
if (basename(filename) !== filename) throw new Error("Unexpected package filename.");
run(["install", `./vendor/${filename}`, "--ignore-scripts", "--no-audit"], app);
console.info(
  "Platform Core development package refreshed. Normal installs use the bundled snapshot.",
);

function run(args, cwd, capture = false) {
  const result = spawnSync(process.execPath, [process.env.npm_execpath, ...args], {
    cwd,
    stdio: capture ? "pipe" : "inherit",
    encoding: "utf8",
    windowsHide: true,
  });
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(`Package command failed: npm ${args[0]}`);
  return result.stdout;
}
