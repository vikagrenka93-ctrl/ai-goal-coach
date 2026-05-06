import { Telegraf, session } from "telegraf";
import { env } from "../config/env.js";
import { startCommand } from "./commands/start.js";
import { goalsCommand } from "./commands/goals.js";
import { progressCommand } from "./commands/progress.js";
import { coachCommand } from "./commands/coach.js";
import { settingsCommand } from "./commands/settings.js";
import { beginGoalCreation, handleGoalCreationText } from "./handlers/goalCreation.js";
import { mainMenuKeyboard } from "./keyboards/mainMenu.js";

export function createBot() {
  const bot = new Telegraf(env.TELEGRAM_BOT_TOKEN);

  bot.use(session());

  bot.start(startCommand);
  bot.command("goals", goalsCommand);
  bot.command("progress", progressCommand);
  bot.command("coach", coachCommand);
  bot.command("settings", settingsCommand);

  bot.hears("🎯 Цели", goalsCommand);
  bot.hears("📈 Прогресс", progressCommand);
  bot.hears("🧠 Коуч", coachCommand);
  bot.hears("⚙️ Настройки", settingsCommand);
  bot.hears("➕ Новая цель", beginGoalCreation);

  bot.on("text", async (ctx, next) => {
    await handleGoalCreationText(ctx);
    return next();
  });

  bot.on("message", async (ctx) => {
    await ctx.reply("Я понимаю команды меню или /start.", mainMenuKeyboard());
  });

  return bot;
}

