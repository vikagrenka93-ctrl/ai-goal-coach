import { Markup } from "telegraf";

export const mainMenuKeyboard = () =>
  Markup.keyboard([["🎯 Цели", "➕ Новая цель"], ["📈 Прогресс", "🧠 Коуч"], ["⚙️ Настройки"]])
    .resize()
    .oneTime(false);

