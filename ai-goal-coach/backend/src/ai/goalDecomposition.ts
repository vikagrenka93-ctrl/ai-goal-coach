import { openai, openaiModel } from "../config/openai.js";

export async function decomposeGoal(goalTitle: string, goalDescription?: string) {
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

