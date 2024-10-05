import { Controller, Get, Param, Query } from '@nestjs/common';
import { TvService } from './tv.service.js';
import DiscoverQueryDto from '../dto/discover-query.dto.js';

@Controller('watch/tv')
export class TvController {
  constructor(private readonly tvService: TvService) {
  }

  @Get('genres')
  async getTvGenres() {
    return (await this.tvService.getTvGenres()).data;
  }

  @Get('discover')
  async discoverMovies(@Query() query: DiscoverQueryDto) {
    return (await (this.tvService.discoverTv(query))).data;
  }

  @Get(':id')
  async getTvById(@Param('id') id: number) {
    return (await this.tvService.getTvById(id)).data;
  }

  @Get(':id/season/:seasonNumber')
  async getSeasonData(@Param('id') id: number, @Param('seasonNumber') seasonNumber: number) {
    return (await this.tvService.getSeasonData(id, seasonNumber)).data;
  }
}
