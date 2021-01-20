import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { RoleDto } from "./role.dto";

export class UserRoleDto {
  @ApiProperty()
  @AutoMap()
  id: string;

  @ApiProperty()
  @AutoMap()
  name: string;

  @ApiProperty()
  @AutoMap(() => RoleDto)
  role: RoleDto;
}