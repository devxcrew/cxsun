import { z } from "zod";

export const moduleSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  status: z.enum(["active", "planned"]),
});
export const platformSchema = z.object({
  name: z.string(),
  version: z.string(),
  modules: z.array(moduleSchema),
});
export const packagesSchema = z.array(
  z.object({ name: z.string(), version: z.string(), scope: z.enum(["runtime", "development"]) }),
);
export const servicesSchema = z.array(
  z.object({ name: z.string(), status: z.string(), detail: z.string() }),
);
export type ApplicationModule = z.infer<typeof moduleSchema>;
export type PlatformStatus = z.infer<typeof platformSchema>;
