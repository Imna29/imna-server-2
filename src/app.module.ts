import { Module } from '@nestjs/common';
import { AppService } from './app.service.js';
import { AuthModule } from './auth/auth.module.js';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './users/user.module.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { FirebaseService } from './firebase.service.js';
import { AppController } from './app.controller.js';
import { WatchModule } from './watch/watch.module.js';

@Module({
  imports: [
    AuthModule,
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    WatchModule],
  controllers: [AppController],
  providers: [AppService, FirebaseService],
})
export class AppModule {
}