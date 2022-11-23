import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';

import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../Entity/user.entity';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserDto } from '../DTO/register-user-dto';
import { LoginUserDto } from '../DTO/login-user-dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity) private collection: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  async registerUser(data: RegisterUserDto) {
    const { name, email, password } = data;
    const alreadyExists = await this.collection.findOneBy({ email });
    if (alreadyExists) {
      throw new UnauthorizedException('User already exists');
    }

    const user = new UserEntity();
    user.name = name;
    user.email = email;

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);
    user.password = hashPassword;

    return await this.collection.save(user);
  }

  async loginUser(data: LoginUserDto) {
    const { email, password } = data;

    const user = await this.collection.findOneBy({ email });
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }
    const matchedPassword = bcrypt.compareSync(password, user.password);

    if (!matchedPassword) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const token = await this.jwtService.signAsync({ email });
    return {
      name: user.name,
      email: user.email,
      token,
    };
  }
}
