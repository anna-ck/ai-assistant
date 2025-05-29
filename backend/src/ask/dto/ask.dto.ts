import { IsNotEmpty, IsString } from "class-validator";
import { IsNumber } from "class-validator";

export class AskDto {
    @IsNotEmpty()
    @IsString()
    question: string;

    @IsNotEmpty()
    @IsNumber()
    fileId: number;
}