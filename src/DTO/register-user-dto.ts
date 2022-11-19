import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class RegisterUserDto {
  @IsNotEmpty()
  @MinLength(2)
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(4)
  password: string;
}