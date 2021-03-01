import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import EmployeeResolver from './employee.resolver';
import { EmployeeService } from './employee.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [EmployeeService, EmployeeResolver],
  exports: [EmployeeService],
})
export class EmployeeModule {}
