import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto, ValidationDto } from 'src/dto/user.dto';
import { User } from 'src/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { plainToClass } from 'class-transformer';
import { SerializedUser } from 'src/type/userType';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private readonly userService: UserService,
    @InjectRepository(User) private userRepo: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const userData = await this.userService.findUserByUsername(username);
    if (userData && (await bcrypt.compare(password, userData.password)))
      return plainToClass(SerializedUser, userData);
  }

  async login(userRepo: User) {
    const payload = {
      username: userRepo.username,
      sub: {
        email: userRepo.email,
      },
    };
    return {
      ...userRepo,
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, { expiresIn: '7d' }),
    };
  }

  async refreshToken(userRepo: User) {
    const payload = {
      username: userRepo.username,
      sub: {
        email: userRepo.email,
      },
    };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
