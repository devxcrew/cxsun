export function readConfig(env: Record<string, string | undefined> = process.env) {
  return {
    host: env.HOST?.trim() || "127.0.0.1",
    port: readPort(env.PORT, 4100, "PORT"),
    webPort: readPort(env.WEB_PORT, 5173, "WEB_PORT"),
    databaseEnabled: env.CXSUN_DATABASE_ENABLED === "1",
    redisUrl: env.CXSUN_REDIS_URL?.trim(),
    smtpHost: env.CXSUN_SMTP_HOST?.trim(),
  };
}

function readPort(value: string | undefined, fallback: number, name: string): number {
  if (value === undefined) return fallback;
  if (!/^\d+$/.test(value)) throw new Error(`${name} must be an integer between 1 and 65535.`);
  const port = Number(value);
  if (port < 1 || port > 65535) throw new Error(`${name} must be between 1 and 65535.`);
  return port;
}
