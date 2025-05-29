import { Injectable } from '@nestjs/common';
import OpenAI from "openai";

@Injectable()
export class OpenaiService {
    private openai: OpenAI;

    constructor() {
        this.openai = new OpenAI({
          apiKey: process.env.OPENAI_API_KEY,
        });
      }
    
      async getEmbedding(text: string): Promise<number[]> {
        const response = await this.openai.embeddings.create({
          model: "text-embedding-3-small",
          input: text,
        });
        return response.data[0].embedding;
      }

      async chatCompletion(prompt: string): Promise<string> {
        const response = await await this.openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: prompt }],
        });
      return response.choices[0].message.content;
    }
}
