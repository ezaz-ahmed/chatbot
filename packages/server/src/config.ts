import dotenv from "dotenv";
import { z } from "zod";

dotenv.config({
  path: "../../.env",
  quiet: true,
});

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),

  PORT: z
    .string()
    .transform((v) => Number(v))
    .refine((v) => Number.isInteger(v) && v > 0 && v < 65536, {
      message: "PORT must be a valid port number",
    })
    .default(8080),

  OPENAI_API_KEY: z.string().min(1, "OPENAI_API_KEY is required"),
  LOG_LEVEL: z.enum(["debug", "info", "warn", "error"]).default("info"),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("❌ Invalid environment variables:");
  for (const issue of parsed.error.issues) {
    console.error(` - ${issue.path.join(".")}: ${issue.message}`);
  }
  process.exit(1);
}

export const env = parsed.data;

export type Env = typeof env;
