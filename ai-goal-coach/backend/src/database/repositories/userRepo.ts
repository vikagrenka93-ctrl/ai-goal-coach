import { prisma } from "../../config/database.js";

export const userRepo = {
  async getOrCreateByTelegramId(telegramId: string) {
    const existing = await prisma.user.findUnique({ where: { telegramId } });
    if (existing) return existing;
    return prisma.user.create({ data: { telegramId } });
  }
};

