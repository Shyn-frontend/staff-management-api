import { AutoMap } from '@automapper/classes';
import { Field, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

@ObjectType()
export class ManagerDto {
  @ApiProperty()
  @AutoMap()
  @Field()
  id: string;

  @ApiProperty()
  @AutoMap()
  @Field()
  name: string;

  @ApiProperty()
  @AutoMap()
  @Field()
  avatar: string;
}
