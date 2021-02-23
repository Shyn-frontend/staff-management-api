import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Department } from '../entities/department.entity';
import { DepartmentService } from './department.service';
import { UserModule } from 'src/user/user.module';
import DepartmentResolver from './resolvers/department.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Department]), UserModule],
  providers: [DepartmentService, DepartmentResolver],
  exports: [],
})
export class DepartmentModule {}
