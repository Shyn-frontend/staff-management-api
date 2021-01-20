import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { PositionDto } from "src/position/dto/position.dto";
import { RoleDto } from "src/role/dto/role.dto";
import { BaseDto } from "src/shared/base.entity";
import { USER_TYPE } from "../enum/user-type.enum";

export class UserDto extends BaseDto {
  @ApiProperty()
  @AutoMap()
  email: string;

  @ApiProperty()
  @AutoMap()
  name: string;

  @ApiProperty({
    enum: USER_TYPE,
    enumName: 'USER_TYPE'
  })
  @AutoMap()
  type: USER_TYPE;

  @ApiProperty({
    type: () => PositionDto
  })
  @AutoMap(() => PositionDto)
  position: PositionDto;

  @ApiProperty({
    type: () => RoleDto
  })
  @AutoMap(() => RoleDto)
  role: RoleDto;

  @ApiProperty()
  @AutoMap()
  avatar?: string;

  @ApiProperty()
  @AutoMap()
  isArchived: boolean;

  @ApiProperty()
  @AutoMap()
  permanentLeaveAt: Date;

  @ApiProperty()
  @AutoMap()
  isComplete: boolean;

  @ApiProperty()
  @AutoMap()
  isPermanent: boolean;
}