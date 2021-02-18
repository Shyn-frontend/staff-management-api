import { AutoMap } from '@automapper/classes';
import { Field, ObjectType } from '@nestjs/graphql';
import { BaseDto } from 'src/shared/base.entity';

@ObjectType()
export class PermissionDto extends BaseDto {
  @Field()
  @AutoMap()
  name: string;

  @Field()
  @AutoMap()
  action: string;
}
