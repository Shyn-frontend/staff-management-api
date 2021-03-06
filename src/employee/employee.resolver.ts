import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserDto } from 'src/user/dto/user.dto';
import { CreateEmployeeParamsDto } from './dto/create-employee-params.dto';
import { EmployeeService } from './employee.service';

@Resolver()
@UseGuards(JwtAuthGuard)
class EmployeeResolver {
  constructor(private readonly employeeService: EmployeeService) {}

  @Query(() => [UserDto])
  async getEmployees(): Promise<UserDto[]> {
    return this.employeeService.getEmployees();
  }

  @Mutation(() => UserDto)
  async createEmployee(
    @Args('data') dto: CreateEmployeeParamsDto,
  ): Promise<UserDto> {
    return this.employeeService.createEmployee(dto);
  }
}

export default EmployeeResolver;
