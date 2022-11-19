
import {PassportStrategy} from "@nestjs/passport"
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "../Entity/user.entity";
import { Repository } from "typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UnauthorizedException } from "@nestjs/common";


export class JwtCustomStrategy extends PassportStrategy(Strategy){
  constructor(@InjectRepository(UserEntity) private collection : Repository<UserEntity>) {
    super({
      JwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'test'
    })
  }

  async validate(payload: {email: string}){
    const {email} = payload
    const user = await this.collection.findOneBy({email})
    if(!user) {
      throw new UnauthorizedException('User not found')
    }
   return user
  }

}