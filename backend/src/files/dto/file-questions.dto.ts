import { IsNotEmpty, IsString } from 'class-validator';

export class FileQuestionsDto {
    @IsNotEmpty()
    @IsString()
    fileId: string;
}