import { Controller, Get, Param, Query } from '@nestjs/common';
import { TrendingDto } from '../dto/trending.dto.js';
import { MovieService } from './movies.service.js';
import DiscoverQueryDto from '../dto/discover-query.dto.js';

@Controller('watch/movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
  async test() {
    return 'hello';
  }

  @Get(':id')
  async getMovieById(@Param('id') id: number) {
    return (await this.movieService.getMovieById(id)).data;
  }

  @Get('trending/:time')
  async getTrendingMovies(@Param() trendingDto: TrendingDto) {
    const movies = await this.movieService.getTrendingMovies(trendingDto.time);
    return movies.data;
  }

  @Get('discover')
  async discoverMovies(@Query() query: DiscoverQueryDto) {
    return (await this.movieService.discoverMovies(query)).data;
  }

  @Get('genres')
  async getMovieGenres() {
    return (await this.movieService.getMovieGenres()).data;
  }
}
