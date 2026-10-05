import { spawnSync } from "node:child_process";
import { mkdirSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const cli = process.env.npm_execpath;
if (!cli) throw new Error("Run npm run packages:foundation.");
const destination = resolve(root, "vendor");
mkdirSync(destination, { recursive: true });
function npm(args, cwd, capture = false) {
  const result = spawnSync(process.execPath, [cli, ...args], {
    cwd,
    encoding: "utf8",
    stdio: capture ? "pipe" : "inherit",
    windowsHide: true,
  });
  if (result.status !== 0) throw new Error("Foundation package preparation failed.");
  return result.stdout;
}
const tarballs = [];
for (const owner of ["framework", "platform"]) {
  const source = resolve(root, `../../shared/${owner}`);
  const manifest = JSON.parse(readFileSync(resolve(source, "package.json"), "utf8"));
  if (manifest.name !== `@devxcrew/${owner}`) throw new Error("Unexpected foundation package.");
  npm(["run", "build"], source);
  const results = JSON.parse(
    npm(["pack", "--ignore-scripts", "--json", "--pack-destination", destination], source, true),
  );
  const artifact = Array.isArray(results) ? results[0] : Object.values(results)[0];
  if (!artifact?.filename || /[/\\]/.test(artifact.filename))
    throw new Error("Invalid package artifact.");
  tarballs.push(`./vendor/${artifact.filename}`);
}
// Persist snapshots so npm ci works without sibling source directories.
npm(["install", "--save-exact", "--ignore-scripts", ...tarballs], root);
console.info(
  "Installed recorded Framework and Platform development snapshots. No npm publication performed.",
);
