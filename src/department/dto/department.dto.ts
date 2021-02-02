import { AutoMap } from '@automapper/classes';
import { Field, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from 'src/shared/base.entity';
import { ManagerDto } from 'src/user/dto/manager.dto';

@ObjectType()
export class DepartmentDto extends BaseDto {
  @ApiProperty()
  @AutoMap()
  @Field()
  name: string;

  @ApiProperty()
  @AutoMap()
  @Field()
  isBillable: boolean;

  @ApiProperty()
  @AutoMap(() => ManagerDto)
  @Field(() => ManagerDto)
  manager: ManagerDto;
}
