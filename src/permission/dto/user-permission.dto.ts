import { AutoMap } from '@automapper/classes';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserPermissionDto {
  @Field()
  @AutoMap()
  name: string;

  @Field()
  @AutoMap()
  action: string;
}
