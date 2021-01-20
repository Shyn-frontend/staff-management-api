import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { ROLES } from "src/entities/role.entity";
import { BaseDto } from "src/shared/base.entity";

export class RoleDto extends BaseDto {
  @ApiProperty()
  @AutoMap()
  name: ROLES;

  @ApiProperty()
  @AutoMap()
  order: number;
}