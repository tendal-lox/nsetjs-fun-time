import { IsString } from 'class-validator';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ContactInfo } from './contact-info.entity';
import { Task } from './task.entity';
import { Meeting } from './meeting.entity';

@Entity()
export class Imployee {
  @Column()
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  name: string;

  @ManyToOne((_) => Imployee, (imployee) => imployee.directReports, {
    onDelete: 'SET NULL',
  })
  manager: Imployee;

  @OneToMany((_) => Imployee, (imployee) => imployee.manager)
  directReports: Imployee[];

  @OneToOne((_) => ContactInfo, (contactInfo) => contactInfo.imployee, {
    eager: true,
  })
  contactInfo: ContactInfo;

  @ManyToMany((_) => Meeting, (meeting) => meeting.attendees)
  @JoinTable()
  meetings: Meeting[];

  @OneToMany((_) => Task, (task) => task.imployee)
  task: Task[];
}
