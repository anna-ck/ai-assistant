import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as pdfParse from 'pdf-parse';
import { chunkText } from './utils';
import { FileChunk } from './entities/file-chunks.entity';
import { OpenaiService } from '../openai/openai.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { File } from './entities/file.entity';
import { Question } from '../ask/entities/question.entity';

@Injectable()
export class FilesService {
    constructor(
        @InjectRepository(FileChunk)
        private fileChunkRepository: Repository<FileChunk>,
        @InjectRepository(File)
        private fileRepository: Repository<File>,
        @InjectRepository(Question)
        private questionRepository: Repository<Question>,
        private openaiService: OpenaiService,
    ) {}

    async uploadFile(file: Express.Multer.File) {
        try {
            if (!file || !file.path) {
                throw new Error('No file uploaded or file path is missing');
            }
            
            const filePath = file.path;
            const fileBuffer = fs.readFileSync(filePath);
            const parsed = await pdfParse(fileBuffer);
            const text = parsed.text;

            const fileEntity = new File();
            fileEntity.name = file.originalname;
            fileEntity.uploadedAt = new Date();
            await this.fileRepository.save(fileEntity);

            const chunks = chunkText(text, 1000);

            for (const chunk of chunks) {
                const embedding = await this.openaiService.getEmbedding(chunk);

                const fileChunk = new FileChunk();
                fileChunk.content = chunk;
                fileChunk.embedding = embedding;
                fileChunk.file = fileEntity;

                await this.fileChunkRepository.save(fileChunk);
            }
            fs.unlinkSync(filePath);
            return {
                message: 'File uploaded successfully',
                length: text.length,
            }
        } catch (error) {
            console.error('File upload error:', error);
            throw new Error('Failed to upload file: ' + error.message);
        }
    }

    async getAllFiles() {
        try {
            const files = await this.fileRepository.find({
                relations: ['chunks'],
                order: {
                    uploadedAt: 'DESC'
                }
            });
            return files;
        } catch (error) {
            console.error('Error fetching files:', error);
            throw new Error('Failed to fetch files: ' + error.message);
        }
    }

    async getQuestions(fileId: string) {
        return this.questionRepository.find({
            where: { file: { id: fileId } },
            order: { askedAt: 'DESC' },
            relations: ['file']
        });
    }

    async getAllQuestions() {
        return this.questionRepository.find({
            order: { askedAt: 'DESC' },
            relations: ['file']
        });
    }

    async saveQuestion(question: string, answer: string, fileId: string) {
        const file = await this.fileRepository.findOne({
            where: { id: fileId },
            relations: ['chunks']
        });

        if (file) {
            const questionEntity = new Question();
            questionEntity.question = question;
            questionEntity.answer = answer;
            questionEntity.file = file;
            await this.questionRepository.save(questionEntity);
        }
    }
}
