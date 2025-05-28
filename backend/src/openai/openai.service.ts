import { Injectable } from '@nestjs/common';

@Injectable()
export class OpenaiService {

    getEmbedding = async (text: string): Promise<number[]> => {
        try {
            const response = await fetch('https://api.openai.com/v1/embeddings', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                },
                body: JSON.stringify({
                  input: text,
                  model: 'text-embedding-3-small',
                }),
              });
            
              const data = await response.json();
              console.log('data', data);
              return data.data[0].embedding;
        } catch (error) {
            console.error('Error getting embedding:', error);
            throw new Error('Failed to get embedding: ' + error.message);
        }
      }
}
