import { Expose, Type } from "class-transformer";
import { Role, RoleEntity } from "src/role/entities/role.entity";
import { BaseModel } from "src/shared/base.entity";
import { BaseEntity, Column, Entity, Index, OneToOne } from "typeorm";
import { Permission, PermissionEntity } from "./permission.entity";

@Entity()
@Index(['id', 'roleId', 'permissionId'])
export class RolePermissionEntity extends BaseEntity {
  @OneToOne(() => RoleEntity)
  role: RoleEntity;

  @OneToOne(() => PermissionEntity)
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