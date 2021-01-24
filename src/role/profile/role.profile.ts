import { MappingProfile } from '@automapper/types';
import { Role } from 'src/entities/role.entity';
import { UserRoleDto } from 'src/user/dto/user-role.dto';
import { RoleDto } from '../dto/role.dto';

export const RoleProfile: MappingProfile = (mapper) => {
  mapper.createMap(Role, RoleDto);
  mapper.createMap(Role, UserRoleDto);
};
