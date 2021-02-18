import { Position } from './position.entity';
import { Role } from './role.entity';
import { Base } from '../shared/base.entity';
import { Column, Entity, Index, JoinColumn, ManyToOne, Unique } from 'typeorm';
import { USER_TYPE } from '../user/enum/user-type.enum';
import { AutoMap } from '@automapper/classes';
import { UserMeta } from './user-meta.entity';

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
    length: 128,
  })
  password: string;

  @Column({
    type: 'varchar',
    length: 128,
  })
  @AutoMap()
  name?: string;

  @AutoMap(() => UserMeta)
  metas: UserMeta[];

  @Column({
    type: 'varchar',
  })
  @AutoMap()
  roleId: string;

  @ManyToOne(() => Role, (role) => role.users)
  @JoinColumn()
  @AutoMap(() => Role)
  role: Role;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  @AutoMap()
  positionId?: string;

  @ManyToOne(() => Position, (position) => position.users)
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
    length: 1024,
    nullable: true,
  })
  @AutoMap()
  avatar?: string;

  @Column({
    type: 'boolean',
    default: false,
  })
  @AutoMap()
  isArchived: boolean;

  @Column({
    type: 'date',
    nullable: true,
  })
  @AutoMap()
  permanentLeaveAt?: Date;

  @Column({
    type: 'boolean',
    default: false,
  })
  @AutoMap()
  isComplete: boolean;

  @Column({
    type: 'boolean',
    default: true,
  })
  @AutoMap()
  isPermanent: boolean;

  public removeFields(fields: string[]): Partial<User> {
    for (const field of fields) {
      delete this[field];
    }
    return this;
  }
}
