import { lstat, readdir, realpath, rm } from "node:fs/promises";
import { dirname, isAbsolute, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const dryRun = process.argv.includes("--dry-run");
const unknown = process.argv.slice(2).filter((arg) => arg !== "--dry-run");
if (unknown.length) throw new Error(`Unknown cleanup option: ${unknown.join(", ")}`);

const targets = [
  ".cache",
  "cache",
  "dist",
  "coverage",
  "test-results",
  "playwright-report",
  "dump",
  "dumps",
  "node_modules/.cache",
  "node_modules/.vite",
  "node_modules/.vite-temp",
];
for (const entry of await readdir(root, { withFileTypes: true })) {
  if (
    entry.isFile() &&
    (/^\.cache.*\.(log|json|tmp)$/.test(entry.name) || entry.name.endsWith(".tsbuildinfo"))
  ) {
    targets.push(entry.name);
  }
}

const canonicalRoot = await realpath(root);
function assertInside(path) {
  const within = relative(canonicalRoot, path);
  if (!within || isAbsolute(within) || within === ".." || within.startsWith(`..${sep}`)) {
    throw new Error(`Cleanup target is outside the application: ${path}`);
  }
}

let count = 0;
for (const target of targets) {
  const path = resolve(root, target);
  assertInside(path);
  try {
    await lstat(path);
    // Validate ancestors so a linked dependency directory cannot escape the app.
    assertInside(resolve(await realpath(dirname(path)), "__cleanup_target__"));
    if (!dryRun) {
      console.info(`Removing: ${target}`);
      await rm(path, { recursive: true, force: true, maxRetries: 3, retryDelay: 250 });
    }
    console.info(`${dryRun ? "Would remove" : "Removed"}: ${target}`);
    count++;
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }
}
console.info(`${dryRun ? "Previewed" : "Cleaned"} ${count} generated paths.`);
