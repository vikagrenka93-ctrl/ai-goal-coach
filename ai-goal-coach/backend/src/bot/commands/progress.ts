import type { Context } from "telegraf";
import { userRepo } from "../../database/repositories/userRepo.js";
import { getUserProgress } from "../../services/progressTracker.js";
import { analyzeProgress } from "../../ai/progressAnalysis.js";

export async function progressCommand(ctx: Context) {
  const telegramId = String(ctx.from?.id ?? "");
  if (!telegramId) return ctx.reply("Не смог определить пользователя.");

  const user = await userRepo.getOrCreateByTelegramId(telegramId);
  const p = await getUserProgress(user.id);

  if (p.totalTasks === 0) {
    return ctx.reply("Пока нет задач. Создайте цель и задачи появятся автоматически.");
  }

  const summary = `📈 Всего выполнено задач: ${p.completedTasks}/${p.totalTasks}`;
  const firstGoal = p.totals[0]?.goal;
  const ai = firstGoal
    ? await analyzeProgress({
        goalTitle: firstGoal.title,
        completedTasks: p.completedTasks,
        totalTasks: p.totalTasks
      })
    : "";

  return ctx.reply([summary, ai].filter(Boolean).join("\n\n"));
}

