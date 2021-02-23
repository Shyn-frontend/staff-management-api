import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartmentModule } from 'src/department/department.module';
import { DepartmentService } from 'src/department/department.service';
import { Position } from '../entities/position.entity';
import { PositionService } from './position.service';
import PositionResolver from './resolvers/position.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([Position]),
    forwardRef(() => DepartmentModule),
  ],
  providers: [PositionService, PositionResolver, DepartmentService],
  exports: [PositionService],
})
export class PositionModule {}
