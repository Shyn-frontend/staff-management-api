import { AutoMap } from '@automapper/classes';
import { Field, ObjectType } from '@nestjs/graphql';
import { ROLES } from 'src/entities/role.entity';
import { PermissionDto } from 'src/permission/dto/permission.dto';
import { BaseDto } from 'src/shared/base.entity';

@ObjectType()
export class RoleDto extends BaseDto {
  @Field()
  @AutoMap()
  name: ROLES;

  @Field()
  @AutoMap()
  order: number;

  @Field(() => [PermissionDto])
  @AutoMap(() => PermissionDto)
  permissions: PermissionDto[];
}
