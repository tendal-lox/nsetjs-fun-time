import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ValidationDto } from 'src/dto/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('validate')
  async validateUser(@Body() validationDto: ValidationDto) {
    return await this.authService.validateUser(validationDto);
  }
}
