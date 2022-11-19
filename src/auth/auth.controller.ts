import { Body, Controller, Post, ValidationPipe } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterUserDto } from "../DTO/register-user-dto";
import { LoginUserDto } from "../DTO/login-user-dto";

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {
  }

  @Post('register')
  registerUser(@Body(ValidationPipe) data : RegisterUserDto){
    return this.authService.registerUser(data)
  }

  @Post('login')
  loginUser(@Body(ValidationPipe) data: LoginUserDto ){
    return this.authService.loginUser(data)
  }
}
