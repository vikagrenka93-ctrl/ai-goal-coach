import type { Context } from "telegraf";

export async function settingsCommand(ctx: Context) {
  return ctx.reply("⚙️ Настройки (в разработке).");
}

