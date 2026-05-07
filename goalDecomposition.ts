import { openai, openaiModel } from "../config/openai.js";

export async function decomposeGoal(goalTitle: string, goalDescription?: string) {
  if (!openai) {
    const base = goalTitle.trim();
    const maybeDue = goalDescription?.match(/(\d{1,2}[./]\d{1,2}([./]\d{2,4})?)/)?.[1];
    const due = maybeDue ? ` (до ${maybeDue})` : "";
    return [
      `Опиши результат цели${due}`,
      "Определи критерий успеха (метрика)",
      "Разбей на 3–5 этапов",
      "Составь список ресурсов/материалов",
      "Запланируй 3 первых действия на 7 дней",
      "Выдели 15 минут сегодня и начни с шага №1"
    ];
  }

  const prompt = [
    "Разбей цель на 5-10 конкретных задач (короткие пункты).",
    "Верни строго JSON-массив строк.",
    `Цель: ${goalTitle}`,
    goalDescription ? `Описание: ${goalDescription}` : ""
  ]
    .filter(Boolean)
    .join("\n");

  const res = await openai.responses.create({
    model: openaiModel,
    input: prompt
  });

  const text = res.output_text?.trim() ?? "[]";
  try {
    const arr = JSON.parse(text);
    if (Array.isArray(arr) && arr.every((x) => typeof x === "string")) return arr as string[];
  } catch {
    // ignore
  }
  return [];
}

