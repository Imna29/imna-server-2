import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  SetMetadata,
} from '@nestjs/common';
import admin from 'firebase-admin';
import { FastifyRequest } from 'fastify';
import { Reflector } from '@nestjs/core';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const request: FastifyRequest = context.switchToHttp().getRequest();
    const authorization = request.headers.authorization;
    const authCookie = request.cookies.authorization;

    if (!authorization && !authCookie) {
      throw new BadRequestException('No authorization header/cookie present.');
    }

    return this.verifyIdToken(authorization ?? authCookie, request);
  }

  async verifyIdToken(idToken: string, request: any): Promise<boolean> {
    try {
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      if (decodedToken) {
        request.user = decodedToken;
        return true;
      }
      return false;
    } catch (error) {
      console.log(error);
      throw new ForbiddenException('Token verification failed.');
    }
  }
}
