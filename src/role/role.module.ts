import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from '../entities/role.entity';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { RolePermission } from 'src/entities/role-permission.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Role]),
    TypeOrmModule.forFeature([RolePermission]),
  ],
  providers: [RoleService],
  controllers: [RoleController],
})
export class RoleModule {}
