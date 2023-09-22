import { IsNumber, IsString } from 'class-validator';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Imployee } from './employee.entity';

@Entity()
export class Meeting {
  @PrimaryGeneratedColumn()
  @IsNumber()
  id: number;

  @Column()
  @IsString()
  zoomUrl: string;

  @ManyToMany((_) => Imployee, (imployee) => imployee.meetings)
  attendees: Imployee[];
}
