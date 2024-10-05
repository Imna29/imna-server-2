import admin from 'firebase-admin';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { App } from 'firebase-admin/app';
import { env } from 'process';

@Injectable()
export class FirebaseService implements OnModuleInit {
  app: App;

  async onModuleInit() {
    this.app = admin.initializeApp({
      credential: admin.credential.cert({
        clientEmail: env.CLIENT_EMAIL,
        privateKey: env.PRIVATE_KEY,
        projectId: env.PROJECT_ID,
      }),
    });
  }
}
