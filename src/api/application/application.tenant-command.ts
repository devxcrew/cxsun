import { executeTenantCommand } from "@devxcrew/platform";
import { createDatabaseProvider } from "../database/index.js";
const database = createDatabaseProvider(process.env);
try {
  await executeTenantCommand(database, process.env, process.argv[2], process.argv.slice(3));
} finally {
  await database.close();
}
