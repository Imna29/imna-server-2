import { Module } from '@nestjs/common';
import { UserService } from './user.service.js';
import { PrismaModule } from '../prisma/prisma.module.js';
import { UserController } from './user.controller.js';

@Module({
  providers: [UserService],
  exports: [UserService],
  imports: [PrismaModule],
  controllers: [UserController],
})
export class UserModule {}
