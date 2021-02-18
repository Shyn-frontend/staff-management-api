import { AutoMap } from '@automapper/classes';
import { Base } from '../shared/base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';

export enum USER_META_FIELDS {
  TARGET_SALES = 'targetSales',
  PREFERRED_MARGIN_PERCENT = 'preferredMarginPercent',
  OWNER_ID = 'ownerId',
  CODE = 'code',
  TOTAL_PROJECTS = 'totalProjects',
  ONGOING_PROJECTS = 'onGoingProjects',
  UPCOMING_PROJECTS = 'upComingProjects',
  CURRENT_SALES = 'currentSales',
  EMPLOYEE_NO = 'employeeNo',
  HOURLY_RATE = 'hourlyRate',
  WEEKLY_HOURS = 'weeklyHours',
  CONTRACT_START = 'contractStart',
  CONTRACT_END = 'contractEnd',
}

@Entity()
export class UserMeta extends Base {
  @Column({
    type: 'varchar',
  })
  @AutoMap()
  userId: string;

  @AutoMap(() => User)
  @ManyToOne(() => User, (user) => user.metas)
  @JoinColumn()
  user: User;

  @Column({
    type: 'enum',
    enum: USER_META_FIELDS,
  })
  @AutoMap()
  key: USER_META_FIELDS;

  @Column({
    type: 'varchar',
    length: 128,
  })
  @AutoMap()
  value: string;
}
