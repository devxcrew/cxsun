import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const npmCli = process.env.npm_execpath;
if (!npmCli) throw new Error("Run this command through npm run packages:local or packages:npm.");
const mode = process.argv[2];
const manifest = JSON.parse(readFileSync(resolve(root, "package.json"), "utf8"));

function npm(args, cwd = root, capture = false) {
  const result = spawnSync(process.execPath, [npmCli, ...args], {
    cwd,
    encoding: "utf8",
    stdio: capture ? "pipe" : "inherit",
    windowsHide: true,
  });
  if (result.status !== 0) throw new Error("Shared package command failed.");
  return result.stdout;
}

if (mode === "local") {
  const sharedRoot = resolve(process.env.CODEXSUN_SHARED_ROOT ?? resolve(root, "../../shared"));
  const addonsRoot = resolve(process.env.CODEXSUN_ADDONS_ROOT ?? resolve(root, "../../addons"));
  const sources = [
    ["framework", resolve(sharedRoot, "framework"), "@devxcrew/core-framework"],
    ["platform", resolve(sharedRoot, "platform"), "@devxcrew/platform"],
    ["ui", resolve(sharedRoot, "ui"), "@devxcrew/react-ui"],
    ["tools", resolve(sharedRoot, "tools"), "@devxcrew/tools"],
    ["email", resolve(addonsRoot, "email"), "@devxcrew/email"],
  ];
  for (const [owner, directory, name] of sources) {
    if (!existsSync(resolve(directory, "package.json")))
      throw new Error(
        `Missing optional ${owner} source at ${directory}. Use packages:npm for the released profile.`,
      );
    const sourceManifest = JSON.parse(readFileSync(resolve(directory, "package.json"), "utf8"));
    if (sourceManifest.name !== name) throw new Error(`Unexpected package source: ${owner}`);
  }
  const destination = resolve(root, ".cache/shared-packages");
  mkdirSync(destination, { recursive: true });
  const tarballs = [];
  for (const [owner, directory] of sources) {
    if (["framework", "platform", "email"].includes(owner)) npm(["run", "build"], directory);
    const packed = JSON.parse(
      npm(
        ["pack", "--ignore-scripts", "--json", "--pack-destination", destination],
        directory,
        true,
      ),
    );
    const artifact = Array.isArray(packed) ? packed[0] : Object.values(packed)[0];
    if (!artifact?.filename || artifact.filename.includes("/") || artifact.filename.includes("\\"))
      throw new Error("npm pack returned no safe artifact filename.");
    tarballs.push(resolve(destination, artifact.filename));
  }
  npm(["install", "--no-save", "--package-lock=false", "--ignore-scripts", ...tarballs]);
  console.info(
    "Installed local package snapshots. Re-run after shared source changes. Release manifests and lockfiles are unchanged.",
  );
} else if (mode === "npm") {
  const packages = [
    "@devxcrew/core-framework",
    "@devxcrew/platform",
    "@devxcrew/email",
    "@devxcrew/react-ui",
    "@devxcrew/tools",
  ].map((name) => `${name}@${manifest.dependencies[name] ?? manifest.devDependencies[name]}`);
  npm(["install", "--no-save", "--package-lock=false", ...packages]);
  console.info("Restored registry packages. npm ci also restores the locked release versions.");
} else {
  throw new Error("Choose local or npm.");
}
