import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { DepartmentService } from '../department.service';
import { CreateDepartmentParamsDto } from '../dto/create-department-params.dto';
import { DepartmentDto } from '../dto/department.dto';

@Resolver()
class DepartmentResolver {
  constructor(private departmentService: DepartmentService) {}

  @Mutation(() => DepartmentDto)
  async createDepartment(
    @Args('department') dto: CreateDepartmentParamsDto,
  ): Promise<DepartmentDto> {
    return this.departmentService.createDepartment(dto);
  }

  @Query(() => [DepartmentDto])
  async departments(): Promise<DepartmentDto[]> {
    return this.departmentService.getDepartments();
  }
}

export default DepartmentResolver;
