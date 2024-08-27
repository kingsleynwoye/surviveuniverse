// pages/api/chat.ts

import type { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

const OPENAI_API_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

const client = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

async function generateChatCompletion(message: string) {
  return await client.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: message }],
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message content is required." });
    }

    try {
      const response = await generateChatCompletion(message);

      const text =
        response?.choices?.[0]?.message?.content?.trim() ?? "No response";

      res.status(200).json({ text });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
