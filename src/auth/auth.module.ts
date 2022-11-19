import { Module } from '@nestjs/common';

import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "../Entity/user.entity";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]),
    JwtModule.register({
      secret:'test',
      signOptions:{
        algorithm: "HS512",
        expiresIn: '5d'
      }
    })
  ],
  providers:[AuthService],
  controllers:[AuthController]
})
export class AuthModule {}
