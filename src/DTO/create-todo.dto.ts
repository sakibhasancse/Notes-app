import { IsNotEmpty, MaxLength, MinLength } from "class-validator";

export class CreateTodoDto {
  @IsNotEmpty()
  @MaxLength(15)
  title: string;
  @IsNotEmpty()
  @MaxLength(500)
  @MinLength(5)
  description: string
}