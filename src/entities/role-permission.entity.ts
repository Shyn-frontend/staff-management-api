import { Base } from '../shared/base.entity';
import { Column, Entity } from 'typeorm';
import { AutoMap } from '@automapper/classes';

@Entity()
export class RolePermissionsPermission extends Base {
  @Column()
  @AutoMap()
  roleId: string;

  @Column()
  @AutoMap()
  permissionId: string;
}
