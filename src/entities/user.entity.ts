import { Position } from "./position.entity";
import { Role } from "./role.entity";
import { Base } from "../shared/base.entity";
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  Unique
} from "typeorm";
import { USER_TYPE } from "../user/enum/user-type.enum";
import { AutoMap } from "@automapper/classes";

@Entity()
@Unique(['email'])
@Index(['email', 'type'])
export class User extends Base {
  @Column({
    type: 'varchar',
    length: 128,
  })
  @AutoMap()
  email?: string;

  @Column({
    type: 'varchar',
    length: 128
  })
  password: string;

  @Column({
    type: 'varchar',
    length: 128,
  })
  @AutoMap()
  name: string;

  @Column({
    type: 'varchar'
  })
  @AutoMap()
  roleId: string;

  @ManyToOne(() => Role, role => role.users)
  @JoinColumn()
  @AutoMap(() => Role)
  role: Role;

  @Column({
    type: 'varchar'
  })
  @AutoMap()
  positionId: string;

  @ManyToOne(() => Position, position => position.users)
  @JoinColumn()
  @AutoMap(() => Position)
  position: Position;

  @Column({
    type: 'enum',
    enum: USER_TYPE,
    default: USER_TYPE.EMPLOYEE,
  })
  @AutoMap()
  type: USER_TYPE;

  @Column({
    type: 'varchar',
    length: 1024
  })
  @AutoMap()
  avatar?: string;

  @Column({
    type: 'boolean',
    default: false
  })
  @AutoMap()
  isArchived: boolean;

  @Column({
    type: 'date',
  })
  @AutoMap()
  permanentLeaveAt?: Date;

  @Column({
    type: 'boolean',
    default: false
  })
  @AutoMap()
  isComplete: boolean;

  @Column({
    type: 'boolean',
    default: true
  })
  @AutoMap()
  isPermanent: boolean;
}