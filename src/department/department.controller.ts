import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { ApiErrors } from 'src/shared/decorators/api-errors.decorator';
import { DepartmentService } from './department.service';
import { CreateDepartmentParamsDto } from './dto/create-department-params.dto';
import { DepartmentDto } from './dto/department.dto';

@Controller('departments')
@ApiTags('Department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) { }

  @Post()
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiCreatedResponse({
    type: DepartmentDto,
    description: 'Create department successfully'
  })
  @ApiErrors()
  async createDepartment(@Body() dto: CreateDepartmentParamsDto): Promise<DepartmentDto> {
    return this.departmentService.createDepartment(dto);
  }
}
