import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { takeLast } from 'rxjs';
import { ImployeeDto } from 'src/dto/employee.dto';
import { ContactInfo } from 'src/entities/contact-info.entity';
import { Imployee } from 'src/entities/employee.entity';
import { Meeting } from 'src/entities/meeting.entity';
import { Task } from 'src/entities/task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ImployeeService {
  constructor(
    @InjectRepository(Imployee)
    private readonly imployeeRepo: Repository<Imployee>,
    @InjectRepository(ContactInfo)
    private readonly ContactInfoRepo: Repository<ContactInfo>,
    @InjectRepository(Task) private readonly TaskRepo: Repository<Task>,
    @InjectRepository(Meeting)
    private readonly MeetingRepo: Repository<Meeting>,
  ) {}

  async insertRecord(imployeeDto: ImployeeDto) {
    const { name } = imployeeDto;
    const ceo = this.imployeeRepo.create({ name: name });
    await this.imployeeRepo.save(ceo);

    const ceoContactInfo = this.ContactInfoRepo.create({
      email: 'ali-fathi77@outlook.com',
    });
    ceoContactInfo.imployee = ceo;
    await this.ContactInfoRepo.save(ceoContactInfo);

    const manager = this.imployeeRepo.create({ name: 'ali fathi' });
    manager.manager = ceo;

    const task1 = this.TaskRepo.create({ name: 'Hire people' });
    await this.TaskRepo.save(task1);
    const task2 = this.TaskRepo.create({ name: 'Present to CEO' });
    await this.TaskRepo.save(task2);

    manager.task = [task1, task2];

    const meeting1 = this.MeetingRepo.create({ zoomUrl: 'meeting.com' });
    meeting1.attendees = [ceo];
    await this.MeetingRepo.save(meeting1);

    manager.meetings = [meeting1];

    await this.imployeeRepo.save(manager);
    return ceo;
  }

  async getEmployeeById(id: number) {
    return this.imployeeRepo.findOne({
      where: {
        id: id,
      },
      relations: ['manager', 'directReports', 'task', 'contactInfo'],
    });
  }
}
