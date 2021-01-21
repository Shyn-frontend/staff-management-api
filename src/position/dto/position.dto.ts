import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from 'src/shared/base.entity';
import { UserDepartmentDto } from 'src/user/dto/user-department.dto';

export class PositionDto extends BaseDto {
  @ApiProperty()
  @AutoMap()
  id: string;

  @ApiProperty()
  @AutoMap()
  name: string;

  @ApiProperty({
    type: () => UserDepartmentDto,
  })
  @AutoMap(() => UserDepartmentDto)
  department: UserDepartmentDto;
}
