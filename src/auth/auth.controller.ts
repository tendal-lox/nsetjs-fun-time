import { Body, Controller, Post, Request, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/dto/user.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { UserService } from '../user/user.service';
import { RefreshJwtGuard } from './guards/refresh-jwt.guard';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('register')
  async registration(@Body() createUserDto: CreateUserDto) {
    return await this.userService.addUser(createUserDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req, @Res({passthrough: true}) response: Response) {
    await this.authService.login(req.user, response);
    response.send(req.user)
  }

  @UseGuards(RefreshJwtGuard)
  @Post('refresh')
  async refreshToken(@Request() req) {
    return this.authService.refreshToken(req.user);
  }
}
