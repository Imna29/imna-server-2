import { Injectable } from '@nestjs/common';
import { WatchService } from '../watch.service.js';
import DiscoverQueryDto from '../dto/discover-query.dto.js';

@Injectable()
export class MovieService {
  constructor(private readonly watchService: WatchService) {}

  async getTrendingMovies(time: string) {
    return this.watchService.axios.get(`trending/movie/${time}?language=en-US`);
  }

  async discoverMovies(query: DiscoverQueryDto) {
    const queryParams = new URLSearchParams({
      ...(query.genre_ids && { with_genres: query.genre_ids.join(',') }),
      sort_by: query.sort_by,
      page: query.page.toString(),
    });

    if (query.sort_by === 'vote_average.desc') {
      queryParams.append('vote_count.gte', '100');
    }

    return this.watchService.axios.get(
      `discover/movie?${queryParams.toString()}`,
    );
  }

  async getMovieGenres() {
    return this.watchService.axios.get(`genre/movie/list`);
  }

  async getMovieById(id: number) {
    return this.watchService.axios.get(
      `movie/${id}?append_to_response=videos,recommendations,similar`,
    );
  }
}
