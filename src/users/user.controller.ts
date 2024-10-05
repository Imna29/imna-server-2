import { Controller, Get, NotFoundException } from '@nestjs/common';
import { User } from '../../decorators/user.decorator.js';
import { DecodedIdToken } from 'firebase-admin/auth';
import { UserService } from './user.service.js';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {
  }

  @Get()
  async getUser(@User() user: DecodedIdToken) {
    const foundUser = await this.userService.findOneById(user.uid);
    if(!foundUser){
      throw new NotFoundException('User not found');
    }
    return foundUser;
  }
}
