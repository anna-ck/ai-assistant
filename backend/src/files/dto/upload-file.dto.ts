import { IsNotEmpty, IsString} from "class-validator";

export class UploadFileDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    file: File;
}