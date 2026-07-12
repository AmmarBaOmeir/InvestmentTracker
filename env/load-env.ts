import { config } from "dotenv";
import { existsSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");

config({ path: resolve(root, ".env") });

const appEnv = process.env.APP_ENV ?? "development";
const envFile = resolve(root, `.env.${appEnv}`);

if (existsSync(envFile)) {
  config({ path: envFile, override: true });
}
