import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { UserPermissionDto } from 'src/permission/dto/user-permission.dto';

export class UserRoleDto {
  @ApiProperty()
  @AutoMap()
  id: string;

  @ApiProperty()
  @AutoMap()
  name: string;

  @ApiProperty({
    type: () => UserPermissionDto,
    isArray: true,
  })
  @AutoMap(() => UserPermissionDto)
  permissions: UserPermissionDto[];
}
