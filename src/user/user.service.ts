import {
  ClassSerializerInterceptor,
  HttpException,
  HttpStatus,
  Injectable,
  UseInterceptors,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { CreateUserDto } from 'src/dto/user.dto';
import { User } from 'src/entities/user.entity';
import { SerializedUser } from 'src/type/userType';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async addUser(createUserDto: CreateUserDto) {
    const { username, email, password } = createUserDto;

    try {
      const useradder = this.userRepo.create({
        username: username,
        email: email,
        password: password,
      });
      return this.userRepo.save(useradder);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async findAllUser(page: number, limit: number) {
    const queryBuilder = this.userRepo.createQueryBuilder('user');
    queryBuilder.offset((page - 1) * limit).limit(limit);
    const result = await queryBuilder.getMany();

    return result.map((user) => plainToClass(SerializedUser, user));
  }

  async findUserByUsername(username: string) {
    return this.userRepo.findOneOrFail({where: {username}})
  }
}
