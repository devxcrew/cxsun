import { spawn } from "node:child_process";
import { resolve } from "node:path";

export async function databasePreflight(root, environment) {
  await new Promise((done, reject) => {
    const child = spawn(
      process.execPath,
      [
        "--import",
        "tsx",
        resolve(root, "src/api/database/operations/database.command.ts"),
        "smoke",
      ],
      { cwd: root, env: environment, stdio: "ignore", windowsHide: true },
    );
    const timeout = setTimeout(() => {
      child.kill();
      reject(new Error("Database preflight timed out; inspect npm run db:smoke."));
    }, 20_000);
    child.once("error", () => {
      clearTimeout(timeout);
      reject(new Error("Database preflight could not start; inspect npm run db:smoke."));
    });
    child.once("exit", (code) => {
      clearTimeout(timeout);
      if (code === 0) done();
      else reject(new Error("Database preflight failed; inspect npm run db:smoke."));
    });
  });
  console.info("Database preflight passed.");
}
