import { RolePermission } from "./role-permission.entity";
import { Base } from "../shared/base.entity";
import { User } from "./user.entity";
import { Column, Entity, OneToMany } from "typeorm";
import { AutoMap } from "@automapper/classes";

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
export class Role extends Base {
  @Column({
    type: 'enum',
    enum: ROLES,
    default: ROLES.EMPLOYEE_ROLE
  })
  @AutoMap()
  name: ROLES;

  @Column()
  @AutoMap()
  order: number;

  @OneToMany(() => User, user => user.role)
  @AutoMap(() => User)
  users?: User[];

  @OneToMany(() => RolePermission, rolePermission => rolePermission.role)
  @AutoMap(() => RolePermission)
  rolePermissions?: RolePermission[];
}