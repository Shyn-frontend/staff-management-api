import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { DepartmentDto } from 'src/department/dto/department.dto';
import { BaseDto } from 'src/shared/base.entity';

export class PositionDto extends BaseDto {
  @ApiProperty()
  @AutoMap()
  name: string;

  @ApiProperty({
    type: () => DepartmentDto,
  })
  @AutoMap(() => DepartmentDto)
  department: DepartmentDto;
}
