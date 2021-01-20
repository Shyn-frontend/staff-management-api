import { createMapper } from "@automapper/core";
import { classes } from '@automapper/classes';
import { Department } from "src/entities/department.entity";
import { DepartmentDto } from "src/department/dto/department.dto";
import { User } from "src/entities/user.entity";
import { LoginResultDto } from "src/auth/dto/login-result.dto";

export const mapper = createMapper({
  name: 'nartcMapper',
  pluginInitializer: classes
});

mapper.createMap(Department, DepartmentDto);
mapper.createMap(User, LoginResultDto);