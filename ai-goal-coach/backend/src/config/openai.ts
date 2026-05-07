import OpenAI from "openai";
import { env } from "./env.js";

export const openaiModel = env.OPENAI_MODEL;

const apiKey = env.OPENAI_API_KEY?.trim();

export const openai = apiKey ? new OpenAI({ apiKey }) : null;
