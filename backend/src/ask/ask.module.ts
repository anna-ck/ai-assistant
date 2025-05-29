import { Module } from '@nestjs/common';
import { AskController } from './ask.controller';
import { AskService } from './ask.service';
import { OpenaiService } from 'src/openai/openai.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileChunk } from 'src/files/entities/file-chunks.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FileChunk])],
  controllers: [AskController],
  providers: [AskService, OpenaiService]
})
export class AskModule {}
