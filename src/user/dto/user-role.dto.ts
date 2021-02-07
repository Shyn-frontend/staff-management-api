import { AutoMap } from '@automapper/classes';
import { Field, ObjectType } from '@nestjs/graphql';
import { UserPermissionDto } from 'src/permission/dto/user-permission.dto';

@ObjectType()
export class UserRoleDto {
  @Field()
  @AutoMap()
  id: string;

  @Field()
  @AutoMap()
  name: string;

  @Field(() => UserPermissionDto)
  @AutoMap(() => UserPermissionDto)
  permissions: UserPermissionDto[];
}
