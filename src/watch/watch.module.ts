import { Module } from '@nestjs/common';
import { WatchController } from './watch.controller.js';
import { WatchService } from './watch.service.js';
import { MovieController } from './movies/movies.controller.js';
import { MovieService } from './movies/movies.service.js';
import { TvController } from './tv/tv.controller.js';
import { TvService } from './tv/tv.service.js';
import { PlaylistController } from './playlist/playlist.controller.js';
import { PlaylistService } from './playlist/playlist.service.js';
import { PrismaModule } from '../prisma/prisma.module.js';

@Module({
  controllers: [
    WatchController,
    MovieController,
    TvController,
    PlaylistController,
  ],
  imports: [PrismaModule],
  providers: [WatchService, MovieService, TvService, PlaylistService],
})
export class WatchModule {}
