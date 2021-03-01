import { UseGuards } from '@nestjs/common';
import { Resolver, Query } from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserDto } from 'src/user/dto/user.dto';
import { EmployeeService } from './employee.service';

@Resolver()
@UseGuards(JwtAuthGuard)
class EmployeeResolver {
  constructor(private readonly employeeService: EmployeeService) {}

  @Query(() => [UserDto])
  async getEmployees(): Promise<UserDto[]> {
    return this.employeeService.getEmployees();
  }
}

export default EmployeeResolver;
