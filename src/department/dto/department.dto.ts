import { AutoMap } from '@automapper/classes';
import { Field, ObjectType } from '@nestjs/graphql';
import { BaseDto } from 'src/shared/base.entity';
import { ManagerDto } from 'src/user/dto/manager.dto';

@ObjectType()
export class DepartmentDto extends BaseDto {
  @AutoMap()
  @Field()
  name: string;

  @AutoMap()
  @Field()
  isBillable: boolean;

  @AutoMap(() => ManagerDto)
  @Field(() => ManagerDto, { nullable: true })
  manager?: ManagerDto;
}
