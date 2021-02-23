import { AutoMap } from '@automapper/classes';
import { Field, ObjectType } from '@nestjs/graphql';
import { PositionDto } from 'src/position/dto/position.dto';
import { RoleDto } from 'src/role/dto/role.dto';
import { USER_TYPE } from '../enum/user-type.enum';
import { UserMetaDto } from '../../user-meta/dto/user-meta.dto';

@ObjectType()
export class NormalizeUserDto {
  @Field({ nullable: true })
  @AutoMap()
  email?: string;

  @Field({ nullable: true })
  @AutoMap()
  name?: string;

  @Field()
  @AutoMap()
  type: USER_TYPE;

  @Field(() => PositionDto)
  @AutoMap(() => PositionDto)
  position: PositionDto;

  @Field(() => RoleDto)
  @AutoMap(() => RoleDto)
  role: RoleDto;

  @Field({ nullable: true })
  @AutoMap()
  avatar?: string;

  @Field()
  @AutoMap()
  isArchived: boolean;

  @Field()
  @AutoMap()
  permanentLeaveAt?: Date;

  @Field()
  @AutoMap()
  isComplete: boolean;

  @Field()
  @AutoMap()
  isPermanent: boolean;

  @Field()
  @AutoMap()
  preferredMarginPercent?: number;

  @Field({ nullable: true })
  @AutoMap()
  hourlyRate?: number;

  @Field({ nullable: true })
  @AutoMap()
  contractStart?: string;

  @Field({ nullable: true })
  @AutoMap()
  contractEnd?: string;
}

// TARGET_SALES = 'targetSales',
//   PREFERRED_MARGIN_PERCENT = 'preferredMarginPercent',
//   OWNER_ID = 'ownerId',
//   CODE = 'code',
//   TOTAL_PROJECTS = 'totalProjects',
//   ONGOING_PROJECTS = 'onGoingProjects',
//   UPCOMING_PROJECTS = 'upComingProjects',
//   CURRENT_SALES = 'currentSales',
//   EMPLOYEE_NO = 'employeeNo',
//   HOURLY_RATE = 'hourlyRate',
//   WEEKLY_HOURS = 'weeklyHours',
//   CONTRACT_START = 'contractStart',
//   CONTRACT_END = 'contractEnd',
