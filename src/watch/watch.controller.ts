import { Controller, Get, Param, Query } from '@nestjs/common';
import { TrendingDto } from './dto/trending.dto.js';
import { WatchService } from './watch.service.js';

@Controller('watch')
export class WatchController {
  constructor(private readonly watchService: WatchService) {
  }

  @Get("all/trending/:time")
  async getAllTrending(@Param() trendingDto: TrendingDto) {
    const movies = await this.watchService.getAllTrending(trendingDto.time);
    return movies.data;
  }

  @Get("/search")
  async search(@Query('s') query: string) {
    return (await this.watchService.search(query)).data;
  }

}
