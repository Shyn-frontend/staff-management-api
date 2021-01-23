import { createMapper } from '@automapper/core';
import { classes } from '@automapper/classes';
import { Department } from 'src/entities/department.entity';
import { DepartmentDto } from 'src/department/dto/department.dto';
import { User } from 'src/entities/user.entity';
import { AuthUserDto } from 'src/auth/dto/auth-user.dto';
import { Position } from 'src/entities/position.entity';
import { PositionDto } from 'src/position/dto/position.dto';
import { RoleDto } from 'src/role/dto/role.dto';
import { Role } from 'src/entities/role.entity';
import { UserRoleDto } from 'src/user/dto/user-role.dto';
import { UserPositionDto } from 'src/user/dto/user-position.dto';
import { UserDepartmentDto } from 'src/user/dto/user-department.dto';

export const mapper = createMapper({
  name: 'nartcMapper',
  pluginInitializer: classes,
});

mapper.createMap(User, AuthUserDto);
mapper.createMap(Department, DepartmentDto);
mapper.createMap(Department, UserDepartmentDto);
mapper.createMap(Position, PositionDto);
mapper.createMap(Position, UserPositionDto);
mapper.createMap(Role, UserRoleDto);
mapper.createMap(Role, RoleDto);
