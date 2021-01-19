import { Expose, Type } from "class-transformer";
import { Role, RoleEntity } from "./role.entity";
import { BaseEntity, BaseModel } from "../shared/base.entity";
import { Entity, JoinColumn, ManyToOne } from "typeorm";
import { Permission, PermissionEntity } from "./permission.entity";

@Entity()
export class RolePermissionEntity extends BaseEntity {
  @ManyToOne(() => RoleEntity, role => role.rolePermissions)
  @JoinColumn()
  role: RoleEntity;

  @ManyToOne(() => PermissionEntity, permission => permission.rolePermissions)
  @JoinColumn()
  permission: PermissionEntity;
}

export class RolePermission extends BaseModel {
  @Expose()
  @Type(() => Role)
  role: Role;

  @Expose()
  @Type(() => Permission)
  permission: Permission;
}