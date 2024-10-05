import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { DecodedIdToken } from 'firebase-admin/auth';
import { PlaylistService } from './playlist.service.js';
import { User } from '../../../decorators/user.decorator.js';
import AddWatchedEpisodeDto from '../dto/watched-episode.dto.js';
import AddToPlaylistDto from '../dto/add-to-playlist.dto.js';

@Controller()
export class PlaylistController {
  constructor(private playlistService: PlaylistService) {}

  // Playlists
  @Get('playlists')
  async getAllPlaylists(@User() user: DecodedIdToken) {
    return await this.playlistService.getAllPlaylists(user.uid);
  }

  @Post('playlists')
  async createPlaylist(@User() user: DecodedIdToken) {
    return;
    // return await this.playlistService.createPlaylist(user.uid, body.name);
  }

  @Get('playlists/:playlistId')
  async getPlaylist(@Param('playlistId') playlistId: string) {
    return;
    // return await this.playlistService.getPlaylist(playlistId);
  }

  @Delete('playlists/:playlistId')
  async deletePlaylist(@Param('playlistId') playlistId: string) {
    return;
    // return await this.playlistService.deletePlaylist(playlistId);
  }

  // Playlist Items
  @Get('playlists/:playlistId/items')
  async getPlaylistItems(@Param('playlistId') playlistId: string) {
    return await this.playlistService.getPlaylistItems(playlistId);
  }

  @Post('playlists/:playlistId/items')
  async addToPlaylist(
    @Param('playlistId', ParseUUIDPipe) playlistId: string,
    @Body() body: AddToPlaylistDto,
  ) {
    return await this.playlistService.addToPlaylist(
      playlistId,
      body.contentId,
      body.contentType,
    );
  }

  @Delete('playlists/:playlistId/items')
  async deletePlaylistItems(
    @Param('playlistId') playlistId: string,
    @Body() body: { itemIds: string[] },
  ) {
    return this.playlistService.deletePlaylistItems(playlistId, body.itemIds);
  }

  @Delete('playlists/:playlistId/items/:itemId')
  async removeFromPlaylist(
    @Param('playlistId') playlistId: string,
    @Param('itemId') itemId: string,
  ) {
    return;
    //return await this.playlistService.removeFromPlaylist(playlistId, itemId);
  }

  // Watched Episodes
  @Get('watched-episodes')
  async getWatchedEpisodes(@User() user: DecodedIdToken) {
    return;
    //return await this.playlistService.getWatchedEpisodes(user.uid);
  }

  @Post('watched-episodes')
  async addWatchedEpisode(
    @User() user: DecodedIdToken,
    @Body() body: AddWatchedEpisodeDto,
  ) {
    return await this.playlistService.addWatchedEpisode(
      user.uid,
      body.tvId,
      body.seasonNumber,
      body.episodeNumber,
    );
  }

  @Get('watched-episodes/:tvId/last')
  async getLastWatchedEpisode(
    @User() user: DecodedIdToken,
    @Param('tvId') tvId: number,
  ) {
    return await this.playlistService.getLastWatchedEpisode(user.uid, tvId);
  }
}
