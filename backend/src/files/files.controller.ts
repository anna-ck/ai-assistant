import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { FilesService } from './files.service';
import * as fs from 'fs';

@Controller('files')
export class FilesController {
    constructor(private readonly filesService: FilesService) {
        // Ensure uploads directory exists
        if (!fs.existsSync('./uploads')) {
            fs.mkdirSync('./uploads', { recursive: true });
        }
    }

    @Post()
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './uploads',
            filename: (req, file, cb) => {
                cb(null, file.originalname + '-' + Date.now());
            }
        })
    }))
    async uploadFile(@UploadedFile() file: Express.Multer.File) {
        return this.filesService.uploadFile(file);
    } 
}
