import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImployeeService } from './employee/employee.service';
import { ImployeeController } from './employee/employee.controller';
import { ImployeeModule } from './employee/employee.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import config from 'ormconfig';
import { AuthService } from './auth/auth.service';
import { UserService } from './user/user.service';
import { AuthController } from './auth/auth.controller';
import { UserController } from './user/user.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    ImployeeModule,
    AuthModule,
    UserModule,
  ],
  controllers: [
    AppController,
    ImployeeController,
    AuthController,
    UserController,
  ],
  providers: [AppService, ImployeeService, AuthService, UserService],
})
export class AppModule {}
