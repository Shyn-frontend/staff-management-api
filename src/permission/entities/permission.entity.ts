import { RoleEntity } from "src/role/entities/role.entity";
import { BaseModel } from "src/shared/base.entity";
import { BaseEntity, Column, Entity, Index, OneToMany } from "typeorm";

@Entity()
@Index(['id', 'name'])
export class PermissionEntity extends BaseEntity {
  @Column()
  name: string;

  @Column()
  action: string;

  roles: RoleEntity[];
}

export class Permission extends BaseModel {

}