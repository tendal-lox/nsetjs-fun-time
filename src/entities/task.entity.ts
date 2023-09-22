import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Imployee } from './employee.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  @IsNumber()
  id: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ManyToOne((_) => Imployee, (imployee) => imployee.task, {
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  imployee: Imployee;
}
