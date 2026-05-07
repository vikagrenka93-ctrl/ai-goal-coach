import { openai, openaiModel } from "../config/openai.js";

export async function analyzeProgress(input: {
  goalTitle: string;
  completedTasks: number;
  totalTasks: number;
}) {
    const client = openai;
  if (!client) return "";
  const prompt = [
    "Сделай краткую сводку прогресса (2-4 предложения) и 1 следующий шаг.",
    "Пиши по-русски, без воды.",
    `Цель: ${input.goalTitle}`,
    `Выполнено задач: ${input.completedTasks}/${input.totalTasks}`
  ].join("\n");

  const res = await client.responses.create({
    model: openaiModel,
    input: prompt
  });

  return (res.output_text ?? "").trim();
}

