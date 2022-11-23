
import {PassportStrategy} from "@nestjs/passport"
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "../Entity/user.entity";
import { Repository } from "typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UnauthorizedException } from "@nestjs/common";


export class JwtCustomStrategy extends PassportStrategy(Strategy) {
  constructor(@InjectRepository(UserEntity) private repo: Repository<UserEntity>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'test'
    });
  }

  async validate(payload: {email: string}) {
    const {email} = payload;
    const user = await this.repo.findOneBy({email});

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}