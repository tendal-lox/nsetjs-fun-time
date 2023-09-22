import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Imployee } from 'src/entities/employee.entity';
import { ImployeeService } from './employee.service';
import { ImployeeController } from './employee.controller';
import { ContactInfo } from 'src/entities/contact-info.entity';
import { Task } from 'src/entities/task.entity';
import { Meeting } from 'src/entities/meeting.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Imployee, ContactInfo, Task, Meeting])],
  providers: [ImployeeService],
  controllers: [ImployeeController],
  exports: [TypeOrmModule],
})
export class ImployeeModule {}
