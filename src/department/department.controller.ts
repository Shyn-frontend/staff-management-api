import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ApiErrors } from 'src/shared/decorators/api-errors.decorator';
import { ApiOperationId } from 'src/shared/decorators/api-operation.decorator';
import { DepartmentService } from './department.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { DepartmentEntity } from '../entities/department.entity';
import { DepartmentDto } from './dto/department.dto';

@Controller('departments')
@ApiTags('Department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) { }

  @Post()
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOkResponse({
    type: DepartmentDto,
    description: 'Create department successfully'
  })
  @ApiErrors()
  @ApiOperationId()
  async createDepartment(@Body() data: CreateDepartmentDto): Promise<DepartmentEntity> {
    return this.departmentService.createDepartment(data);
  }
}
