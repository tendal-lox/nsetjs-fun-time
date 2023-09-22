import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ImployeeService } from './employee.service';
import { ImployeeDto } from 'src/dto/employee.dto';

@Controller('imployee')
export class ImployeeController {
  constructor(private readonly imployeeService: ImployeeService) {}

  @Post('add')
  async insertRecord(@Body() imployeeDto: ImployeeDto) {
    return this.imployeeService.insertRecord(imployeeDto);
    // return 'insert completed'
  }

  @Get(':id')
  async findEmployee(@Param('id') id: number) {
    return this.imployeeService.getEmployeeById(1);
  }
}
