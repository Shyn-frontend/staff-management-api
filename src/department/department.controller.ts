import { Body, Controller, Post, Get, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiErrors } from 'src/shared/decorators/api-errors.decorator';
import { DepartmentService } from './department.service';
import { CreateDepartmentParamsDto } from './dto/create-department-params.dto';
import { DepartmentDto } from './dto/department.dto';

@ApiTags('Department')
@Controller('departments')
@UseGuards(JwtAuthGuard)
@ApiErrors()
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Post()
  @ApiBearerAuth()
  @ApiCreatedResponse({
    type: DepartmentDto,
    description: 'Create department successfully',
  })
  async createDepartment(
    @Body() dto: CreateDepartmentParamsDto,
  ): Promise<DepartmentDto> {
    return this.departmentService.createDepartment(dto);
  }

  @Get()
  @ApiOkResponse({
    type: DepartmentDto,
    isArray: true,
  })
  async getDepartments(): Promise<DepartmentDto[]> {
    return this.departmentService.getDepartments();
  }
}
