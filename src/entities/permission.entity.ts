import { Base } from '../shared/base.entity';
import { Column, Entity, Index, OneToMany } from 'typeorm';
import { RolePermission } from './role-permission.entity';
import { AutoMap } from '@automapper/classes';

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

  @OneToMany(
    () => RolePermission,
    (rolePermission) => rolePermission.permission,
  )
  rolePermissions?: RolePermission[];
}
