import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsOptional()
  @IsEmail()
  email: string

  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  password: string;
}

export class ValidationDto extends PartialType(CreateUserDto) {}
