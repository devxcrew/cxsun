import { createSettingsProvider } from "@devxcrew/framework";
import { z } from "zod";

const fallbacks = {
  APP_NAME: "Cxsun",
  APP_PORT: "5173",
  APP_URL: "http://127.0.0.1:5173",
  APP_MODE: "development",
  APP_HOST: "127.0.0.1",
  APP_ID: "cxsun",
  APP_USER: "developer",
  MCP_SERVER_URL: "https://mcp.codexsun.com/mcp",
  DB_DRIVER: "mariadb",
  DB_PORT: "3306",
  DB_MASTER_NAME: "cx_master_db",
  DB_SQLITE_PATH: "storage/private/data/identity.sqlite",
  DB_BACKUP_DIR: "storage/private/data/backup",
  IDENTITY_MODE: "single-client",
  IDENTITY_TENANT_ID: "default",
  IDENTITY_TENANT_NAME: "Cxsun organization",
  IDENTITY_SESSION_SECONDS: "28800",
  STORAGE_ROOT: "storage/app",
  STORAGE_PUBLIC_ROOT: "storage/public",
  EMAIL_ENABLED: "0",
  SMTP_PORT: "587",
  SMTP_SECURE: "0",
} satisfies NodeJS.ProcessEnv;

const environmentSchema = z.object({
  APP_NAME: z.string().trim().min(1).optional(),
  APP_PORT: z.coerce.number().int().min(1).max(65535).optional(),
  APP_URL: z.url().optional(),
  APP_MODE: z.enum(["development", "production"]).optional(),
  APP_HOST: z.string().trim().min(1).optional(),
  APP_ID: z
    .string()
    .regex(/^[a-z][a-z0-9-]{0,63}$/)
    .optional(),
  DB_DRIVER: z.enum(["sqlite", "mariadb"]).optional(),
  DB_PORT: z.coerce.number().int().min(1).max(65535).optional(),
  DB_MASTER_NAME: z
    .string()
    .regex(/^[a-zA-Z][a-zA-Z0-9_]{0,63}$/)
    .optional(),
  IDENTITY_MODE: z.enum(["single-client", "multi-tenant"]).optional(),
  IDENTITY_SESSION_SECONDS: z.coerce.number().int().min(300).max(86400).optional(),
  EMAIL_ENABLED: z.enum(["0", "1"]).optional(),
  SMTP_PORT: z.coerce.number().int().min(1).max(65535).optional(),
  SMTP_SECURE: z.enum(["0", "1"]).optional(),
});

const writableKeys = [
  "APP_NAME",
  "APP_PORT",
  "APP_URL",
  "APP_MODE",
  "APP_HOST",
  "DB_DRIVER",
  "DB_HOST",
  "DB_PORT",
  "DB_USER",
  "DB_PASSWORD",
  "DB_MASTER_NAME",
  "DB_SQLITE_PATH",
  "DB_BACKUP_DIR",
  "IDENTITY_MODE",
  "IDENTITY_TENANT_ID",
  "IDENTITY_TENANT_NAME",
  "IDENTITY_SESSION_SECONDS",
  "EMAIL_ENABLED",
  "SMTP_HOST",
  "SMTP_PORT",
  "SMTP_SECURE",
  "SMTP_USER",
  "SMTP_PASSWORD",
  "EMAIL_FROM",
];

const provider = createSettingsProvider({
  defaults: fallbacks,
  schema: environmentSchema,
  writableKeys,
});
export function loadSettings(root = process.cwd(), overrides: NodeJS.ProcessEnv = process.env) {
  return provider.load(root, overrides);
}
export const writeSettingsFile = provider.write;
