import type { Context } from "telegraf";
import { userRepo } from "../../database/repositories/userRepo.js";
import { goalRepo } from "../../database/repositories/goalRepo.js";
import { taskRepo } from "../../database/repositories/taskRepo.js";
import { decomposeGoal } from "../../ai/goalDecomposition.js";

type SessionLike = {
  pendingGoalTitle?: boolean;
};

function getSession(ctx: Context): SessionLike {
  const anyCtx = ctx as unknown as { session?: SessionLike };
  anyCtx.session ??= {};
  return anyCtx.session;
}

export async function beginGoalCreation(ctx: Context) {
  const s = getSession(ctx);
  s.pendingGoalTitle = true;
  return ctx.reply("Ок! Напиши название цели (1 строка).");
}

export async function handleGoalCreationText(ctx: Context) {
  const s = getSession(ctx);
  if (!s.pendingGoalTitle) return;

  const msg = (ctx as unknown as { message?: unknown }).message;
  const title =
    msg && typeof msg === "object" && msg !== null && "text" in msg && typeof (msg as any).text === "string"
      ? (msg as any).text.trim()
      : "";
  if (!title) return ctx.reply("Не вижу текст. Напиши название цели.");

  const telegramId = String(ctx.from?.id ?? "");
  if (!telegramId) return ctx.reply("Не смог определить пользователя.");

  const user = await userRepo.getOrCreateByTelegramId(telegramId);
  const goal = await goalRepo.create(user.id, title);

  s.pendingGoalTitle = false;

  await ctx.reply(`🎯 Цель создана: ${goal.title}\nДелаю план задач...`);

  const tasks = await decomposeGoal(goal.title);
  if (tasks.length === 0) {
    return ctx.reply("Не смог автоматически разбить на задачи. Можешь добавить вручную позже.");
  }

  for (const t of tasks.slice(0, 12)) {
    await taskRepo.add(goal.id, t);
  }

  return ctx.reply(`Готово! Добавил задач: ${Math.min(tasks.length, 12)}.`);
}

