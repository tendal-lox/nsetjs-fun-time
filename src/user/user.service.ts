import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { CreateUserDto } from 'src/dto/user.dto';
import { User } from 'src/entities/user.entity';
import { SerializedUser } from 'src/type/userType';
import { MetadataAlreadyExistsError, MetadataWithSuchNameAlreadyExistsError, Repository } from "typeorm";

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async addUser(createUserDto: CreateUserDto) {
    const { username, email, password } = createUserDto;

    const userDbCheck = await this.findUserByUsername(username);
    if (userDbCheck) throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);

    try {
      const userAdder = this.userRepo.create({
        username: username,
        email: email,
        password: password,
      });
      const userObject = this.userRepo.save(userAdder);
      return plainToClass(SerializedUser, userObject);
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
    return this.userRepo.findOneOrFail({ where: { username } });
  }
}
