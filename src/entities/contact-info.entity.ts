import { IsNumber, IsOptional, IsString } from 'class-validator';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Imployee } from './employee.entity';

@Entity()
export class ContactInfo {
  @Column()
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: null })
  @IsOptional()
  @IsNumber()
  phone: number;

  @Column()
  @IsString()
  email: string;

  @OneToOne((_) => Imployee, (imployee) => imployee.contactInfo, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  imployee: Imployee;
}
