import { executeDatabaseCommand } from "../index.js";

await executeDatabaseCommand(process.argv[2], process.argv.slice(3));
