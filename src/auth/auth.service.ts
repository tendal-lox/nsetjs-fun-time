import { ClassSerializerInterceptor, Injectable, UseInterceptors } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ValidationDto } from 'src/dto/user.dto';
import { User } from 'src/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'
import { plainToClass } from 'class-transformer';
import { SerializedUser } from 'src/type/userType';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  async validateUser(validationDto: ValidationDto) {
    const { username, password } = validationDto;
    const userData = await this.userService.findUserByUsername(username)

    if (userData && await bcrypt.compare(password, userData.password))
      return plainToClass(SerializedUser, userData)

  }
}
