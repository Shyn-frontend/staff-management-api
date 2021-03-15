import { AutoMap } from '@automapper/classes';
import { UseGuards } from '@nestjs/common';
import {
  Resolver,
  Query,
  Mutation,
  Args,
  Field,
  ObjectType,
} from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Pagination } from 'src/shared/base.entity';
import { SearchParamsDto } from 'src/shared/dtos/search-params.dto';
import { UserDto } from 'src/user/dto/user.dto';
import { CreateEmployeeParamsDto } from './dto/create-employee-params.dto';
import { EmployeeService } from './employee.service';

@ObjectType()
export class QueryEmployeeResults {
  @Field(() => [UserDto])
  @AutoMap(() => UserDto)
  data: UserDto[];

  @Field(() => Pagination)
  @AutoMap(() => Pagination)
  metadata: Pagination;
}

@Resolver()
@UseGuards(JwtAuthGuard)
class EmployeeResolver {
  constructor(private readonly employeeService: EmployeeService) {}

  @Query(() => QueryEmployeeResults)
  async getEmployees(
    @Args('conditions', { nullable: true }) conditions?: SearchParamsDto,
  ): Promise<QueryEmployeeResults> {
    return this.employeeService.getEmployees(conditions);
  }

  @Mutation(() => UserDto)
  async createEmployee(
    @Args('data') dto: CreateEmployeeParamsDto,
  ): Promise<UserDto> {
    return this.employeeService.createEmployee(dto);
  }
}

export default EmployeeResolver;
