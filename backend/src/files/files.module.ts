import { Module } from '@nestjs/common';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import { OpenaiModule } from 'src/openai/openai.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { File } from './entities/file.entity';
import { FileChunk } from './entities/file-chunks.entity';
import { OpenaiService } from 'src/openai/openai.service';

@Module({
  imports: [OpenaiModule, TypeOrmModule.forFeature([File, FileChunk])],
  controllers: [FilesController],
  providers: [FilesService, OpenaiService]
})
export class FilesModule {}
