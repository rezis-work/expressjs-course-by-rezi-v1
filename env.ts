import { env as loadEnv } from "custom-env";
import { z } from "zod";

process.env.APP_STAGE = process.env.APP_STAGE || "dev";

const isProduction = process.env.APP_STAGE === "production";
const isDevelopment = process.env.APP_STAGE === "dev";
const isTesting = process.env.APP_STAGE === "test";

if (isDevelopment) {
  loadEnv();
} else if (isTesting) {
  loadEnv("test");
}

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  APP_STAGE: z.enum(["dev", "production", "test"]).default("dev"),
  PORT: z.coerce.number().positive().default(3001),
  VERSION: z.string(),
  // DATABASE_URL: z.string().startsWith("postgresql://"),
  // JWT_SECRET: z.string().min(32, "Must be at least 32 characters long"),
  // JWT_EXPIRES_IN: z.string().default("7d"),
  // BCRYPT_ROUNDS: z.coerce.number().min(10).max(20).default(12),
});

export type Env = z.infer<typeof envSchema>;
let env: Env;

try {
  env = envSchema.parse(process.env);
} catch (e) {
  if (e instanceof z.ZodError) {
    console.error("Invalid environment variables:", e.message);
    console.error(JSON.stringify(z.flattenError(e).fieldErrors, null, 2));
    e.issues.forEach((issue) => {
      console.error(`${issue.path.join(".")}: ${issue.message}`);
    });

    process.exit(1);
  }

  throw e;
}

export const isProd = () => env.APP_STAGE === "production";
export const isDev = () => env.APP_STAGE === "dev";
export const isTest = () => env.APP_STAGE === "test";

export { env };
export default env;
