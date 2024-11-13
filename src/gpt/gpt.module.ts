import { Module } from '@nestjs/common';
import { GptController } from './gpt.controller.js';
import { GptService } from './gpt.service.js';
import { GptGateway } from './gpt.gateway.js';
import { PrismaModule } from '../prisma/prisma.module.js';

@Module({
  controllers: [GptController],
  imports: [PrismaModule],
  providers: [GptService, GptGateway],
})
export class GptModule {}
