import type { Context } from "telegraf";

export async function dailyCheckinHandler(ctx: Context) {
  return ctx.reply("Ежедневный чек-ин (в разработке).");
}

