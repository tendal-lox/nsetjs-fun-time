import { IsString, MinLength } from 'class-validator';

export class ImployeeDto {
  @IsString()
  @MinLength(5)
  name: string;
}
