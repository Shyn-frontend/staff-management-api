import { Expose, Type } from "class-transformer";
import { RolePermission, RolePermissionEntity } from "./role-permission.entity";
import { BaseEntity, BaseModel } from "../shared/base.entity";
import { User, UserEntity } from "./user.entity";
import { Column, Entity, Index, OneToMany } from "typeorm";

export enum ROLES {
  ADMIN_ROLE = 'Admin',
  HR_ADMIN_ROLE = 'HR Admin',
  TEAM_HEAD_ROLE = 'Team Head',
  PROJECT_ADMIN_ROLE = 'Project Admin',
  PROJECT_MANAGER_ROLE = 'Project Manager',
  EMPLOYEE_ROLE = 'Employee',
  CLIENT_ROLE = 'Client',
}
@Entity()
export class RoleEntity extends BaseEntity {
  @Column({
    type: 'enum',
    enum: ROLES,
    default: ROLES.EMPLOYEE_ROLE
  })
  name: ROLES;

  @Column()
  order: number;

  @OneToMany(() => UserEntity, user => user.role)
  users: UserEntity[];

  @OneToMany(() => RolePermissionEntity, rolePermission => rolePermission.role)
  rolePermissions: RolePermissionEntity[];
}

export class Role extends BaseModel {
  @Expose()
  name: ROLES;

  @Expose()
  order: number;

  @Expose()
  @Type(() => User)
  users: User[];

  @Expose()
  @Type(() => RolePermission)
  rolePermissions: RolePermission[];
}