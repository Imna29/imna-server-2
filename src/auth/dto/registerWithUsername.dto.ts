import { IsString, MinLength, MaxLength } from 'class-validator';

export class RegistrationWithUsernameDto {

  @IsString()
  @MinLength(2)
  @MaxLength(25)
  readonly username: string;
}