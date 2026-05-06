import { Markup } from "telegraf";

export const goalActionsKeyboard = (goalId: string) =>
  Markup.inlineKeyboard([
    [Markup.button.callback("📋 Задачи", `goal:${goalId}:tasks`)],
    [Markup.button.callback("➕ Добавить задачу", `goal:${goalId}:add_task`)],
    [Markup.button.callback("✅ Отметить прогресс", `goal:${goalId}:checkin`)]
  ]);

