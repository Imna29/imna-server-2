import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosInstance } from 'axios';

@Injectable()
export class WatchService {
  public axios: AxiosInstance;


  constructor(private configService: ConfigService) {
    this.axios = axios.create({
      baseURL: 'https://api.themoviedb.org/3',
      headers: {
        Accept: 'application/json',
        Authorization: this.configService.get<string>('TMDB_API_KEY'),
      },
    });
  }

  async getAllTrending(time: string) {
    return this.axios.get(`trending/all/${time}?language=en-US`);
  }

  async search(query: string) {
    return this.axios.get(`search/multi?query=${query}&language=en-US`);
  }
}
