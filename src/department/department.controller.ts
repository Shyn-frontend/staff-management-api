import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ApiErrors } from 'src/shared/decorators/api-errors.decorator';
import { ApiOperationId } from 'src/shared/decorators/api-operation.decorator';
import { DepartmentService } from './department.service';

@Controller('departments')
@ApiTags('Department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) { }

  @Post()
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOkResponse()
  @ApiErrors()
  @ApiOperationId()
  async createDepartment(@Body() data) {
    return this.departmentService.createDepartment({ data });
  }
}
