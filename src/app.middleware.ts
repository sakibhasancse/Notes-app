import {Injectable, NestMiddleware} from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class AppMiddleware implements NestMiddleware{
  use(req:Request, res:Response, next:NextFunction){
    req.body = {
      email:"sakib",
      password: '12'
    }
    next();
  }
}