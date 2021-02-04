import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { DepartmentService } from '../department.service';
import { CreateDepartmentParamsDto } from '../dto/create-department-params.dto';
import { DepartmentDto } from '../dto/department.dto';

@Resolver()
@UseGuards(JwtAuthGuard)
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
