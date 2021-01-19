import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEntity } from '../entities/role.entity';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { RolePermissionEntity } from 'src/entities/role-permission.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RoleEntity]), TypeOrmModule.forFeature([RolePermissionEntity])],
  providers: [RoleService],
  controllers: [RoleController],
})
export class RoleModule { }
