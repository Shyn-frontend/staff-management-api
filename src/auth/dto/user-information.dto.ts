import { AutoMap } from '@automapper/classes';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserRoleDto } from 'src/user/dto/user-role.dto';
import { BaseDto } from 'src/shared/base.entity';
import { UserPositionDto } from 'src/user/dto/user-position.dto';
import { USER_TYPE } from 'src/user/enum/user-type.enum';

export class UserInformationDto extends BaseDto {
  @ApiProperty()
  @AutoMap()
  email?: string;

  @ApiProperty()
  @AutoMap()
  name?: string;

  @ApiProperty({
    enum: USER_TYPE,
    enumName: 'USER_TYPE',
  })
  @AutoMap()
  type: USER_TYPE;

  @ApiProperty({
    type: () => UserPositionDto,
  })
  @AutoMap(() => UserPositionDto)
  position: UserPositionDto;

  @ApiProperty({
    type: () => UserRoleDto,
  })
  @AutoMap(() => UserRoleDto)
  role: UserRoleDto;

  @ApiPropertyOptional()
  @AutoMap()
  avatar?: string;

  @ApiProperty()
  @AutoMap()
  isArchived: boolean;

  @ApiPropertyOptional()
  permanentLeaveAt?: Date;

  @ApiProperty()
  @AutoMap()
  isComplete: boolean;
}
