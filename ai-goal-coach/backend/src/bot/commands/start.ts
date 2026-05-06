import type { Context } from "telegraf";
import { mainMenuKeyboard } from "../keyboards/mainMenu.js";
import { userRepo } from "../../database/repositories/userRepo.js";

export async function startCommand(ctx: Context) {
  const telegramId = String(ctx.from?.id ?? "");
  if (!telegramId) return ctx.reply("Не смог определить пользователя.");

  await userRepo.getOrCreateByTelegramId(telegramId);

  return ctx.reply(
    "Привет! Я помогу поставить цель, разбить на задачи и держать прогресс.",
    mainMenuKeyboard()
  );
}

