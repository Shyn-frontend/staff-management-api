import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartmentEntity } from '../entities/department.entity';
import { DepartmentService } from './department.service';
import { DepartmentController } from './department.controller';
import { UserModule } from 'src/user/user.module';
import { UserEntity } from 'src/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DepartmentEntity]), UserModule],
  providers: [DepartmentService],
  controllers: [DepartmentController]
})
export class DepartmentModule {

}
