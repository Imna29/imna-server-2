import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller.js';
import { AuthService } from './auth.service.js';
import { UserModule } from '../users/user.module.js';
import { AuthGuard } from './auth.guard.js';
import { APP_GUARD } from '@nestjs/core';

@Module({
  controllers: [
    AuthController,
  ],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  imports: [
    UserModule,
  ],
})
export class AuthModule {
}
