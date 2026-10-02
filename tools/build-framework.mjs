import { spawnSync } from "node:child_process";
import { resolve } from "node:path";
const result = spawnSync(
  process.execPath,
  [
    resolve("node_modules/typescript/bin/tsc"),
    "-p",
    resolve("../../shared/framework/tsconfig.json"),
    "--typeRoots",
    resolve("node_modules/@types"),
  ],
  { stdio: "inherit" },
);
process.exit(result.status ?? 1);
