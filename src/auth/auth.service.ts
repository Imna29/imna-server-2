import { Injectable } from '@nestjs/common';
import { UserService } from '../users/user.service.js';
import admin from 'firebase-admin';

@Injectable()
export class AuthService {
  constructor(

  ) {
  }

  registerUserToFirebase(email: string, password: string) {
    return admin.auth().createUser({
      email,
      password,
      emailVerified: false,
    });
  }

  deleteUser(id: string) {
    return admin.auth().deleteUser(id);
  }
}
