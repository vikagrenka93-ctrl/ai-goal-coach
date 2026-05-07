import "dotenv/config";
import { z } from "zod";

const EnvSchema = z.object({
  NODE_ENV: z.string().default("development"),
  PORT: z.coerce.number().default(3001),
  TELEGRAM_BOT_TOKEN: z.string().min(1),
  // Public base URL of the backend (Render), e.g. https://my-app.onrender.com
  PUBLIC_URL: z.string().url().optional(),
  // Webhook path mounted on Express. Keep it stable after setting webhook.
  TELEGRAM_WEBHOOK_PATH: z.string().default("/telegram/webhook"),
 OPENAI_API_KEY: OPENAI_API_KEY: z
  .preprocess((v) => (typeof v === "string" ? v.trim() : v), z.string().min(1))
  .optional(),
  OPENAI_MODEL: z.string().default("gpt-4.1-mini"),
  DATABASE_URL: z.string().min(1)
});

export const env = EnvSchema.parse(process.env);

