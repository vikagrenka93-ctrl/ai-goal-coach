import { prisma } from "../../config/database.js";

export const goalRepo = {
  async listByUserId(userId: string) {
    return prisma.goal.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      include: { tasks: true }
    });
  },

  async create(userId: string, title: string, description?: string) {
    return prisma.goal.create({
      data: { userId, title, description: description || null }
    });
  },

  async getById(goalId: string) {
    return prisma.goal.findUnique({ where: { id: goalId }, include: { tasks: true } });
  }
};

