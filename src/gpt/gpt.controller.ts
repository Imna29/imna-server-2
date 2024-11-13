import { Body, Controller, Post, Sse } from '@nestjs/common';
import { GptService } from './gpt.service.js';
import { BasicChatDto } from './dto/basic-chat.dto.js';
import { map } from 'rxjs';

@Controller('gpt')
export class GptController {
  constructor(private gptService: GptService) {}

  @Post('chat')
  async basicChat(@Body() body: BasicChatDto) {
    return (await this.gptService.chat(body.query)).pipe(
      map((data) => ({ data })),
    );
  }
}
