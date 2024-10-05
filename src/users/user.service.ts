import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findOneByUsername(username: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        username: username,
      },
    });
  }

  async findOneById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });
  }

  async create(id: string, username: string): Promise<User> {
    return this.prisma.$transaction(async (prisma) => {
      const user = await prisma.user.create({
        data: {
          id,
          username,
        },
      });

      await prisma.watchPlaylist.createMany({
        data: [
          {
            name: 'History',
            userId: user.id,
            type: 'HISTORY',
          },
          {
            name: 'Watch Later',
            userId: user.id,
            type: 'WATCH_LATER',
          },
          {
            name: 'Favorites',
            userId: user.id,
            type: 'FAVORITES',
          },
          
        ],
      });

      return user;
    });
  }
}
