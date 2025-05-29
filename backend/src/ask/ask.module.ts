import { Module } from '@nestjs/common';
import { AskController } from './ask.controller';
import { AskService } from './ask.service';
import { OpenaiService } from 'src/openai/openai.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileChunk } from 'src/files/entities/file-chunks.entity';
import { FilesService } from 'src/files/files.service';
import { File } from 'src/files/entities/file.entity';
import { Question } from './entities/question.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FileChunk, File, Question])],
  controllers: [AskController],
  providers: [AskService, OpenaiService, FilesService]
})
export class AskModule {}
