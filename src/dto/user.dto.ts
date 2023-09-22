import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsOptional()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  password: string;
}

export class ValidationDto extends PartialType(CreateUserDto) {}
