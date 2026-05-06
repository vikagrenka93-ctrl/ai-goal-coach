import type { Context } from "telegraf";
import { taskRepo } from "../../database/repositories/taskRepo.js";

export async function completeTaskHandler(ctx: Context, taskId: string) {
  await taskRepo.complete(taskId);
  return ctx.reply("✅ Отметил задачу выполненной.");
}

