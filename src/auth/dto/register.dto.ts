import { IsString, IsEmail, IsStrongPassword, MinLength, MaxLength } from 'class-validator';

export class RegistrationDto {

  @IsString()
  @MinLength(2)
  @MaxLength(25)
  readonly username: string;

  @IsEmail()
  readonly email: string;

  @IsString()
  @IsStrongPassword()
  readonly password: string;
}