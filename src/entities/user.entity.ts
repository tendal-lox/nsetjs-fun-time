import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @IsString()
  id: string;

  @Column({ unique: true })
  @IsString()
  @IsNotEmpty()
  username: string;

  @Column({ unique: true, default: null })
  @IsString()
  @IsOptional()
  email: string;

  @Column({ unique: true })
  @IsString()
  @IsNotEmpty()
  password: string;

  @BeforeInsert()
  async hashPass() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
