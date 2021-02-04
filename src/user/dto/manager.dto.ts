import { AutoMap } from '@automapper/classes';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ManagerDto {
  @AutoMap()
  @Field()
  id: string;

  @AutoMap()
  @Field()
  name: string;

  @AutoMap()
  @Field()
  avatar: string;
}
