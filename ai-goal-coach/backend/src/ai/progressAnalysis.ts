import { openai, openaiModel } from "../config/openai.js";

export async function analyzeProgress(input: {
  goalTitle: string;
  completedTasks: number;
  totalTasks: number;
}) {
  const prompt = [
    "Сделай краткую сводку прогресса (2-4 предложения) и 1 следующий шаг.",
    "Пиши по-русски, без воды.",
    `Цель: ${input.goalTitle}`,
    `Выполнено задач: ${input.completedTasks}/${input.totalTasks}`
  ].join("\n");

  const res = await openai.responses.create({
    model: openaiModel,
    input: prompt
  });

  return (res.output_text ?? "").trim();
}

