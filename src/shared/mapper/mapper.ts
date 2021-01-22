import { createMapper } from '@automapper/core';
import { classes } from '@automapper/classes';
import { Department } from 'src/entities/department.entity';
import { DepartmentDto } from 'src/department/dto/department.dto';
import { User } from 'src/entities/user.entity';
import { AuthUserDto } from 'src/auth/dto/auth-user.dto';

export const mapper = createMapper({
  name: 'nartcMapper',
  pluginInitializer: classes,
});

mapper.createMap(Department, DepartmentDto);
mapper.createMap(User, AuthUserDto);
