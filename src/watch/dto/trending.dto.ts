import { IsIn } from 'class-validator';

export class TrendingDto {
  @IsIn(['week', 'day'])
  time: string;
}