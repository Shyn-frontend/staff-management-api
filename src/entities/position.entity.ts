import { Department } from './department.entity';
import { Base } from '../shared/base.entity';
import { User } from './user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { AutoMap } from '@automapper/classes';

@Entity()
export class Position extends Base {
  @Column({
    type: 'varchar',
    length: 128,
  })
  @AutoMap()
  name: string;

  @Column()
  @AutoMap()
  departmentId: string;

  @ManyToOne(() => Department, (department) => department.positions)
  @JoinColumn()
  @AutoMap(() => Department)
  department: string;

  @OneToMany(() => User, (user) => user.position)
  @AutoMap(() => User)
  users?: User[];
}
