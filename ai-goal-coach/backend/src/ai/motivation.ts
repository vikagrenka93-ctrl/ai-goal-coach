import { openai, openaiModel } from "../config/openai.js";

export async function generateMotivation(userContext: { name?: string; goalTitle?: string }) {
  const prompt = [
    "Ты — эмпатичный коуч. Напиши короткое (1-3 предложения) мотивационное сообщение на русском.",
    "Без токсичной позитивности, конкретно и поддерживающе.",
    userContext.name ? `Имя: ${userContext.name}` : "",
    userContext.goalTitle ? `Цель: ${userContext.goalTitle}` : ""
  ]
    .filter(Boolean)
    .join("\n");

  const res = await openai.responses.create({
    model: openaiModel,
    input: prompt
  });

  return (res.output_text ?? "").trim();
}

