import { IsNumber } from "class-validator";

export default class AddWatchedEpisodeDto {
  @IsNumber()
  tvId: number;

  @IsNumber()
  seasonNumber: number;

  @IsNumber()
  episodeNumber: number;
}