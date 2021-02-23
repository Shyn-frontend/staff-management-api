import { MappingProfile } from '@automapper/types';
import { Permission } from 'src/entities/permission.entity';
import { PermissionDto } from '../dto/permission.dto';
import { UserPermissionDto } from '../dto/user-permission.dto';

export const PermissionProfile: MappingProfile = (mapper) => {
  mapper.createMap(Permission, PermissionDto);
  mapper.createMap(Permission, UserPermissionDto);
};
