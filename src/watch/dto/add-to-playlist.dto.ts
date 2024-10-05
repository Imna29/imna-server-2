import { IsEnum, IsNumber } from 'class-validator';

export default class AddToPlaylistDto {
  @IsNumber()
  contentId: number;
  @IsEnum(['MOVIE', 'TV_SHOW'])
  contentType: 'MOVIE' | 'TV_SHOW';
}
