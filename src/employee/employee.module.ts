import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartmentModule } from 'src/department/department.module';
import { User } from 'src/entities/user.entity';
import { PositionModule } from 'src/position/position.module';
import { RoleModule } from 'src/role/role.module';
import { UserMetaModule } from 'src/user-meta/user-meta.module';
import { UserModule } from 'src/user/user.module';
import EmployeeResolver from './employee.resolver';
import { EmployeeService } from './employee.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    UserModule,
    UserMetaModule,
    RoleModule,
    PositionModule,
    DepartmentModule,
  ],
  providers: [EmployeeService, EmployeeResolver],
  exports: [EmployeeService],
})
export class EmployeeModule {}
