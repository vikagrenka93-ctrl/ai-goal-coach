import { openai, openaiModel } from "../config/openai.js";

export async function generateMotivation(userContext: { name?: string; goalTitle?: string }) {
  if (!openai) {
    const who = userContext.name ? `${userContext.name}, ` : "";
    const goal = userContext.goalTitle ? ` по цели «${userContext.goalTitle}»` : "";
    const variants = [
      `${who}сделай сегодня один маленький шаг${goal}. 10 минут — и уже есть прогресс.`,
      `${who}если энергии мало — выбери самый лёгкий шаг${goal} и просто начни.`,
      `${who}прогресс — это регулярность. Один короткий шаг${goal} лучше, чем ноль.`
    ];
    return variants[Math.floor(Math.random() * variants.length)];
  }

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

