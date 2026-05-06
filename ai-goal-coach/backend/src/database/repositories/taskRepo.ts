import { prisma } from "../../config/database.js";

export const taskRepo = {
  async add(goalId: string, title: string, dueDate?: Date) {
    return prisma.task.create({
      data: {
        goalId,
        title,
        dueDate: dueDate ?? null
      }
    });
  },

  async complete(taskId: string) {
    return prisma.task.update({
      where: { id: taskId },
      data: { completedAt: new Date() }
    });
  }
};

