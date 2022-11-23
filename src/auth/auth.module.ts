import { Module } from '@nestjs/common';

import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "../Entity/user.entity";
import { JwtModule } from "@nestjs/jwt";
import { JwtCustomStrategy } from "./jwt-custom.strategy";
import { PassportModule } from "@nestjs/passport";

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]),
    JwtModule.register({
      secret:'test',
      signOptions:{
        algorithm: "HS512",
        expiresIn: '5d'
      }
    }),
    PassportModule.register({
      defaultStrategy: 'jwt'
    })
  ],
  providers: [AuthService, JwtCustomStrategy],
  controllers: [AuthController],
  exports: [PassportModule, JwtCustomStrategy]
})
export class AuthModule {}
