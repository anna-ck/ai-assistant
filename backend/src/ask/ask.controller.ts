import { Body, Controller, Post } from '@nestjs/common';
import { AskService } from './ask.service';
import { AskDto } from './dto/ask.dto';

@Controller('ask')
export class AskController {
    constructor(private readonly askService: AskService) {}

    @Post()
    async ask(@Body() body: AskDto) {
        return this.askService.ask(body.question, body.fileId);
    }
}
