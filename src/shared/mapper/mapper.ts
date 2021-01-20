import { createMapper } from '@automapper/core';
import { classes } from '@automapper/classes';
import { Department } from 'src/entities/department.entity';
import { DepartmentDto } from 'src/department/dto/department.dto';
import { User } from 'src/entities/user.entity';
import { UserInformationDto } from 'src/auth/dto/user-information.dto';

export const mapper = createMapper({
  name: 'nartcMapper',
  pluginInitializer: classes,
});

mapper.createMap(Department, DepartmentDto);
mapper.createMap(User, UserInformationDto);
