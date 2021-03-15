import { AutoMap } from '@automapper/classes';
import { UseGuards } from '@nestjs/common';
import { Args, Field, Mutation, ObjectType, Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Pagination } from 'src/shared/base.entity';
import { QueryParamsBaseDto } from 'src/shared/dtos/query-params-base.dto';
import { DepartmentService } from '../department.service';
import { CreateDepartmentParamsDto } from '../dto/create-department-params.dto';
import { DepartmentDto } from '../dto/department.dto';

@ObjectType()
export class QueryDepartmentResults {
  @Field(() => [DepartmentDto])
  @AutoMap(() => DepartmentDto)
  data: DepartmentDto[];

  @Field(() => Pagination)
  @AutoMap(() => Pagination)
  metadata: Pagination;
}
@Resolver()
@UseGuards(JwtAuthGuard)
class DepartmentResolver {
  constructor(private readonly departmentService: DepartmentService) {}

  @Mutation(() => DepartmentDto)
  async createDepartment(
    @Args('data') dto: CreateDepartmentParamsDto,
  ): Promise<DepartmentDto> {
    return this.departmentService.createDepartment(dto);
  }

  @Query(() => QueryDepartmentResults)
  async departments(
    @Args('conditions', { nullable: true }) conditions?: QueryParamsBaseDto,
  ): Promise<QueryDepartmentResults> {
    return this.departmentService.getDepartments(conditions);
  }
}

export default DepartmentResolver;
