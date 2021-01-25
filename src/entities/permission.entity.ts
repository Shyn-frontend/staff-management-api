import { Base } from '../shared/base.entity';
import { Column, Entity, Index, ManyToMany } from 'typeorm';
import { AutoMap } from '@automapper/classes';
import { Role } from './role.entity';

@Entity()
@Index(['name'])
export class Permission extends Base {
  @Column({
    type: 'varchar',
    length: 128,
  })
  @AutoMap()
  name: string;

  @Column({
    type: 'varchar',
    length: 128,
  })
  @AutoMap()
  action: string;

  @ManyToMany(() => Role, (role) => role.permissions)
  roles: Permission[];
}
