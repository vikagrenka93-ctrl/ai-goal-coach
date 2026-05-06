import type { Context } from "telegraf";
import { userRepo } from "../../database/repositories/userRepo.js";
import { goalRepo } from "../../database/repositories/goalRepo.js";
import { generateMotivation } from "../../ai/motivation.js";

export async function coachCommand(ctx: Context) {
  const telegramId = String(ctx.from?.id ?? "");
  if (!telegramId) return ctx.reply("Не смог определить пользователя.");

  const user = await userRepo.getOrCreateByTelegramId(telegramId);
  const goals = await goalRepo.listByUserId(user.id);
  const top = goals[0];

  const text = await generateMotivation({
    name: ctx.from?.first_name,
    goalTitle: top?.title
  });

  return ctx.reply(text || "Ты молодец. Давай сделаем маленький шаг сегодня.");
}

