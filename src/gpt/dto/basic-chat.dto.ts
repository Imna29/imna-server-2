import { IsNotEmpty, IsString } from 'class-validator';

export class BasicChatDto {
  @IsString()
  @IsNotEmpty()
  query: string;
}
