import { IsArray, IsEnum, IsInt, IsNumber, IsOptional, Min } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export default class DiscoverQueryDto {
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  @Transform(({ value }) => value.split(',').map(Number))
  genre_ids?: number[];

  @IsEnum(['popularity.desc', 'vote_average.desc'])
  sort_by: 'popularity.desc' | 'vote_average.desc';

  @IsInt()
  @Min(1)
  @Type(() => Number)
  page: number;
}