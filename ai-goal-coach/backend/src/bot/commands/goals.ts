import type { Context } from "telegraf";
import { userRepo } from "../../database/repositories/userRepo.js";
import { goalRepo } from "../../database/repositories/goalRepo.js";
import { goalActionsKeyboard } from "../keyboards/goalActions.js";

export async function goalsCommand(ctx: Context) {
  const telegramId = String(ctx.from?.id ?? "");
  if (!telegramId) return ctx.reply("Не смог определить пользователя.");

  const user = await userRepo.getOrCreateByTelegramId(telegramId);
  const goals = await goalRepo.listByUserId(user.id);

  if (goals.length === 0) {
    return ctx.reply("Пока нет целей. Нажмите «➕ Новая цель» или отправьте /start.");
  }

  for (const g of goals.slice(0, 10)) {
    const completed = g.tasks.filter((t) => Boolean(t.completedAt)).length;
    const total = g.tasks.length;
    await ctx.reply(
      `🎯 ${g.title}\nЗадачи: ${completed}/${total}`,
      goalActionsKeyboard(g.id)
    );
  }
}

