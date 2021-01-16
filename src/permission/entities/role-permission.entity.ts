import { Expose, Type } from "class-transformer";
import { Role, RoleEntity } from "src/role/entities/role.entity";
import { BaseModel } from "src/shared/base.entity";
import { BaseEntity, Column, Entity, Index, ManyToOne, OneToOne } from "typeorm";
import { Permission, PermissionEntity } from "./permission.entity";

@Entity()
@Index(['id', 'roleId', 'permissionId'])
export class RolePermissionEntity extends BaseEntity {
  @ManyToOne(() => RoleEntity, role => role.rolePermissions)
  role: RoleEntity;

  @ManyToOne(() => PermissionEntity, permission => permission.rolePermissions)
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