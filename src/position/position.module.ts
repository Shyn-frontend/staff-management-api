import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartmentModule } from 'src/department/department.module';
import { Position } from '../entities/position.entity';
import { PositionService } from './position.service';
import PositionResolver from './resolvers/position.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Position]), DepartmentModule],
  providers: [PositionService, PositionResolver],
})
export class PositionModule {}
