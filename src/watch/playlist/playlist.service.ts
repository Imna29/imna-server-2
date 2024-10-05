import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';

@Injectable()
export class PlaylistService {
  constructor(private prisma: PrismaService) {}

  async addToPlaylist(
    playlistId: string,
    movieId: number,
    contentType: 'MOVIE' | 'TV_SHOW',
  ) {
    return await this.prisma.watchPlaylistItem.upsert({
      where: {
        playlistId_contentType_contentId: {
          contentId: movieId,
          playlistId,
          contentType,
        },
      },
      update: {
        contentId: movieId,
      },
      create: {
        playlistId,
        contentType,
        contentId: movieId,
      },
    });
  }

  async addWatchedEpisode(
    userId: string,
    tvId: number,
    seasonNummber: number,
    episodeNumber: number,
  ) {
    return await this.prisma.watchedEpisode.upsert({
      where: {
        userId_tvShowId_seasonNum_episodeNum: {
          userId,
          seasonNum: seasonNummber,
          episodeNum: episodeNumber,
          tvShowId: tvId,
        },
      },
      update: {
        episodeNum: episodeNumber,
      },
      create: {
        tvShowId: tvId,
        userId,
        seasonNum: seasonNummber,
        episodeNum: episodeNumber,
      },
    });
  }

  async getAllPlaylists(userId: string) {
    return this.prisma.watchPlaylist.findMany({
      where: {
        userId: userId,
      },
    });
  }

  async getLastWatchedEpisode(userId: string, tvId: number) {
    const lastEpisodeWatched = await this.prisma.watchedEpisode.findFirst({
      where: {
        userId,
        tvShowId: tvId,
      },
      orderBy: [{ seasonNum: 'desc' }, { episodeNum: 'desc' }],
    });

    const recentEpisodeWatched = await this.prisma.watchedEpisode.findFirst({
      where: {
        userId,
        tvShowId: tvId,
      },
      orderBy: {
        watchedAt: 'desc',
      },
    });

    return {
      lastEpisodeWatched,
      recentEpisodeWatched,
    };
  }

  async getPlaylistItems(playlistId: string) {
    return this.prisma.watchPlaylist.findUnique({
      where: {
        id: playlistId,
      },
      include: {
        items: {
          orderBy: {
            watchedAt: 'desc',
          },
        },
      },
    });
  }

  async deletePlaylistItems(playlistId: string, items: string[]) {
    return this.prisma.watchPlaylistItem.deleteMany({
      where: {
        playlistId,
        id: {
          in: items,
        },
      },
    });
  }
}
