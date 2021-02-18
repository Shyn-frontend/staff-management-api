import { AutoMap } from '@automapper/classes';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserMetaDto {
  @Field()
  @AutoMap()
  key: string;

  @Field()
  @AutoMap()
  value: string;
}
