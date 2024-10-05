import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const users = await prisma.user.findMany();

for (const user of users) {
  console.log(user.id);
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
}
