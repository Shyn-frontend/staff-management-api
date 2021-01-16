import { Expose, Type } from "class-transformer";
import { RoleEntity } from "src/role/entities/role.entity";
import { BaseModel } from "src/shared/base.entity";
import { BaseEntity, Column, Entity, Index, ManyToMany, ManyToOne, OneToMany } from "typeorm";
import { RolePermission, RolePermissionEntity } from "./role-permission.entity";

@Entity()
@Index(['id', 'name'])
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