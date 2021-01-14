import { Expose } from "class-transformer";
import { BaseEntity, BaseModel } from "src/shared/base.entity";
import { Column, Entity, Index } from "typeorm";

export enum ROLES {
  ADMIN_ROLE = 'Admin',
  HR_ADMIN_ROLE = 'HR Admin',
  TEAM_HEAD_ROLE = 'Team Head',
  PROJECT_ADMIN_ROLE = 'Project Admin',
  PROJECT_MANAGER_ROLE = 'Project Manager',
  EMPLOYEE_ROLE = 'Employee',
  CLIENT_ROLE = 'Client',
}
@Entity('role')
@Index(['id'])
export class RoleEntity extends BaseEntity {
  @Column({
    type: 'enum',
    enum: ROLES,
    default: ROLES.EMPLOYEE_ROLE
  })
  name: ROLES;

  @Column()
  order: number;
}

export class Role extends BaseModel {
  @Expose()
  name: ROLES;

  @Expose()
  order: number;
}