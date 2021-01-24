import { MappingProfile } from '@automapper/types';
import { Department } from 'src/entities/department.entity';
import { UserDepartmentDto } from 'src/user/dto/user-department.dto';
import { DepartmentDto } from '../dto/department.dto';

export const DepartmentProfile: MappingProfile = (mapper) => {
  mapper.createMap(Department, DepartmentDto);
  mapper.createMap(Department, UserDepartmentDto);
};
