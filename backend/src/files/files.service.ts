import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as pdfParse from 'pdf-parse';

@Injectable()
export class FilesService {
    async uploadFile(file: Express.Multer.File) {
        try {
            if (!file || !file.path) {
                throw new Error('No file uploaded or file path is missing');
            }
            
            const filePath = file.path;
            console.log('filePath', filePath);
            const fileBuffer = fs.readFileSync(filePath);
            const parsed = await pdfParse(fileBuffer);
            const text = parsed.text;
            console.log('txt', text);
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
}
