import express from "express";
import { env } from "./config/env.js";
import { prisma } from "./config/database.js";
import { createBot } from "./bot/index.js";

const app = express();
app.use(express.json());

app.get("/health", async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ ok: false });
  }
});

const bot = createBot();
app.post(env.TELEGRAM_WEBHOOK_PATH, bot.webhookCallback(env.TELEGRAM_WEBHOOK_PATH));

const server = app.listen(env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`HTTP listening on :${env.PORT}`);
});

async function bootstrapBot() {
  if (env.PUBLIC_URL) {
    const webhookUrl = new URL(env.TELEGRAM_WEBHOOK_PATH, env.PUBLIC_URL).toString();
    await bot.telegram.setWebhook(webhookUrl);
    // eslint-disable-next-line no-console
    console.log(`Telegram webhook set to ${webhookUrl}`);
    return;
  }

  await bot.launch();
  // eslint-disable-next-line no-console
  console.log("Telegram bot launched (long polling)");
}

bootstrapBot().catch((e) => {
  // eslint-disable-next-line no-console
  console.error("Failed to bootstrap bot", e);
  process.exitCode = 1;
});

process.once("SIGINT", async () => {
  bot.stop("SIGINT");
  server.close();
  await prisma.$disconnect();
});
process.once("SIGTERM", async () => {
  bot.stop("SIGTERM");
  server.close();
  await prisma.$disconnect();
});

