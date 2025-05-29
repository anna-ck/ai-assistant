import { Injectable } from '@nestjs/common';
import { OpenaiService } from 'src/openai/openai.service';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository, DataSource } from 'typeorm';
import { FileChunk } from 'src/files/entities/file-chunks.entity';

@Injectable()
export class AskService {   
        constructor(
        private readonly openaiService: OpenaiService,
        private dataSource: DataSource,
    ) {}

    async ask(question: string, fileId: number) {
        const embedding = await this.openaiService.getEmbedding(question);
        const embeddingString = JSON.stringify(embedding);
        const chunks = await this.dataSource.query(
            `SELECT *, embedding <#> $1 AS distance
             FROM file_chunk
             WHERE "fileId" = $2
             ORDER BY distance ASC
             LIMIT 5`,
            [embeddingString, fileId]
          );
          const context = chunks.map(c => c.content).join('\n\n');

          const prompt = `
            Use the following context to answer the question. If the answer is not in the context, say "I don't know."
        
            Context:
            ${context}
        
            Question: ${question}
          `;
        
          const answer = await this.openaiService.chatCompletion(prompt);
        
          return {
            data: answer
          }
    }
}
