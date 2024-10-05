import { Injectable } from '@nestjs/common';
import { WatchService } from '../watch.service.js';
import DiscoverQueryDto from '../dto/discover-query.dto.js';


@Injectable()
export class TvService {
  constructor(private readonly watchService: WatchService) {
  }

  async getTvGenres() {
    return this.watchService.axios.get(`genre/tv/list`);
  }

  async discoverTv(query: DiscoverQueryDto) {
    const queryParams = new URLSearchParams({
      ...(query.genre_ids && { with_genres: query.genre_ids.join(',') }),
      sort_by: query.sort_by,
      page: query.page.toString(),
    });

    if (query.sort_by === 'vote_average.desc') {
      queryParams.append('vote_count.gte', '100');
    }

    return this.watchService.axios.get(`discover/tv?${queryParams.toString()}`);
  }

  async getTvById(id: number) {
    return this.watchService.axios.get(
      `tv/${id}?append_to_response=videos,recommendations,similar`,
    );
  }

  async getSeasonData(tvId: number, seasonNumber: number) {
    return this.watchService.axios.get(`tv/${tvId}/season/${seasonNumber}`);
  }
}