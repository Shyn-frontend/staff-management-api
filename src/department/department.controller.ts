import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ApiErrors } from 'src/shared/decorators/api-errors.decorator';
import { ApiOperationId } from 'src/shared/decorators/api-operation.decorator';
import { DepartmentService } from './department.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { DepartmentEntity } from './entities/department.entity';

@Controller('departments')
@ApiTags('Department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) { }

  @Post()
  // @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOkResponse()
  @ApiErrors()
  @ApiOperationId()
  async createDepartment(@Body() data: CreateDepartmentDto): Promise<DepartmentEntity> {
    return this.departmentService.createDepartment(data);
  }
}
