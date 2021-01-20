import { createMapper } from "@automapper/core";
import { classes } from '@automapper/classes';
import { Department } from "src/entities/department.entity";
import { DepartmentDto } from "src/department/dto/department.dto";

export const mapper = createMapper({
  name: 'nartcMapper',
  pluginInitializer: classes
});

mapper.createMap(DepartmentDto, Department);