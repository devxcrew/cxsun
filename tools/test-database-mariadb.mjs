import { spawn } from "node:child_process";
const child = spawn(
  process.execPath,
  ["--import", "tsx", "--test", "src/api/database/tests/mariadb.live.test.ts"],
  {
    env: {
      ...process.env,
      DB_TEST_MARIADB: "1",
      DB_TEST_ROWS: process.argv.includes("--stress") ? "100000" : "10000",
    },
    stdio: "inherit",
    windowsHide: true,
  },
);
child.once("error", () => {
  console.error("MariaDB test process could not start.");
  process.exitCode = 1;
});
child.once("exit", (code) => {
  process.exitCode = code ?? 1;
});
