import { Position } from './position.entity';
import { Base } from '../shared/base.entity';
import { User } from './user.entity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { AutoMap } from '@automapper/classes';

@Entity()
export class Department extends Base {
  @Column({
    type: 'varchar',
    length: 1024,
  })
  @AutoMap()
  name: string;

  @OneToOne(() => User)
  @JoinColumn({
    name: 'managerId',
  })
  @AutoMap(() => User)
  manager?: User;

  @Column({
    type: 'boolean',
    default: true,
  })
  @AutoMap()
  isBillable: boolean;

  @OneToMany(() => Position, (position) => position.department)
  @AutoMap(() => Position)
  positions?: Position[];
}
