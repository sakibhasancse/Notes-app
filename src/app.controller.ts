import { Controller, Get, Param, Query, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';
import { GetProfileByIdParam } from './app.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/users')
  getUsers(): Object {
    return this.appService.getUsers();
  }

  @Get('/profile/:id')
  getProfile(
    @Req() request: Request,
    @Param() param: GetProfileByIdParam,
  ): Object {
    return this.appService.getProfile(request);
  }
}
