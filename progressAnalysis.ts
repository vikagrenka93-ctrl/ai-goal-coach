import { openai, openaiModel } from "../config/openai.js";

export async function analyzeProgress(input: {
  goalTitle: string;
  completedTasks: number;
  totalTasks: number;
}) {
  if (!openai) {
    const pct = input.totalTasks === 0 ? 0 : Math.round((input.completedTasks / input.totalTasks) * 100);
    const next =
      input.totalTasks - input.completedTasks > 0
        ? "Выбери одну ближайшую невыполненную задачу и сделай её за 10–15 минут."
        : "Добавь следующую маленькую задачу, чтобы продолжить движение.";
    return `📌 Цель: ${input.goalTitle}\nПрогресс: ${input.completedTasks}/${input.totalTasks} (${pct}%).\nСледующий шаг: ${next}`;
  }

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

