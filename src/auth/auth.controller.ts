import { BadRequestException, Body, Controller, Get, InternalServerErrorException, Post } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { User } from '../../decorators/user.decorator.js';
import { DecodedIdToken, UserRecord } from 'firebase-admin/auth';
import { Public } from './auth.guard.js';
import { RegistrationDto } from './dto/register.dto.js';
import { UserService } from '../users/user.service.js';
import { RegistrationWithUsernameDto } from './dto/registerWithUsername.dto.js';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UserService,
  ) {
  }

  @Get('session')
  async getUserSession(@User() user: DecodedIdToken) {
    return user;
  }

  @Public()
  @Post('register')
  async register(@Body() registrationDto: RegistrationDto) {
    let firebaseUser: UserRecord;
    try {
      firebaseUser = await this.authService.registerUserToFirebase(registrationDto.email, registrationDto.password);
    } catch (err) {
      throw new BadRequestException(err.errorInfo.message, { cause: err });
    }

    try {
      return await this.usersService.create(firebaseUser.uid, registrationDto.username);
    } catch (err) {
      await this.authService.deleteUser(firebaseUser.uid);
      if (err.code === 'P2002') {
        throw new BadRequestException('The username is already in use by another account.', { cause: err });
      }
      throw new InternalServerErrorException('Server could not add the user', { cause: err });
    }
  }

  @Post('register/username')
  async registerWithUsername(@User() user: DecodedIdToken, @Body() registrationDto: RegistrationWithUsernameDto) {
    try {
      return await this.usersService.create(user.uid, registrationDto.username);
    } catch (err) {
      if (err.code === 'P2002') {
        throw new BadRequestException('The username is already in use by another account.', { cause: err });
      }
      throw new InternalServerErrorException('Server could not add the user', { cause: err });
    }
  }
}
