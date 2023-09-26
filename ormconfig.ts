import { ContactInfo } from 'src/entities/contact-info.entity';
import { Imployee } from 'src/entities/employee.entity';
import { Meeting } from 'src/entities/meeting.entity';
import { Task } from 'src/entities/task.entity';
import { User } from 'src/entities/user.entity';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

const config: MysqlConnectionOptions = {
  type: 'mysql',
  database: 'test',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'mysql',
  entities: [Imployee, ContactInfo, Task, Meeting, User],
  synchronize: true,
  logging: true,
};

export default config;
