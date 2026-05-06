import { prisma } from "../config/database.js";

export async function getUserProgress(userId: string) {
  const goals = await prisma.goal.findMany({
    where: { userId, status: "ACTIVE" },
    include: { tasks: true }
  });

  const totals = goals.map((g) => {
    const total = g.tasks.length;
    const completed = g.tasks.filter((t) => Boolean(t.completedAt)).length;
    return { goal: g, total, completed };
  });

  const completedTasks = totals.reduce((acc, x) => acc + x.completed, 0);
  const totalTasks = totals.reduce((acc, x) => acc + x.total, 0);

  return { totals, completedTasks, totalTasks };
}

