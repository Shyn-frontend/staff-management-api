import { Expose, Type } from "class-transformer";
import { BaseEntity, BaseModel } from "../shared/base.entity";
import { Column, Entity, Index, OneToMany } from "typeorm";
import { RolePermission, RolePermissionEntity } from "./role-permission.entity";

@Entity('permission')
@Index(['name'])
export class PermissionEntity extends BaseEntity {
  @Column()
  name: string;

  @Column()
  action: string;

  @OneToMany(() => RolePermissionEntity, rolePermission => rolePermission.permission)
  rolePermissions: RolePermissionEntity[];
}

export class Permission extends BaseModel {
  @Expose()
  name: string;

  @Expose()
  action: string;

  @Expose()
  @Type(() => RolePermission)
  rolePermissions: RolePermission[];

}