import {
  Body,
  Controller,
  Get,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from 'src/dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('add')
  async addUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.addUser(createUserDto);
  }

  @Get('allUser')
  async findAllUSers(
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
  ) {
    return this.userService.findAllUser(page, limit);
  }
}
