import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class LoginUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(4)
  password: string;
}