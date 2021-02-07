import { AutoMap } from '@automapper/classes';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserDepartmentDto {
  @Field()
  @AutoMap()
  id: string;

  @Field()
  @AutoMap()
  name: string;

  @Field()
  @AutoMap()
  isBillable: boolean;
}
