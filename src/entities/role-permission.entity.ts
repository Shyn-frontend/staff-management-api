import { Base } from "../shared/base.entity";
import { Entity, JoinColumn, ManyToOne } from "typeorm";
import { Permission } from "./permission.entity";
import { Role } from "./role.entity";
import { AutoMap } from "@automapper/classes";

@Entity()
export class RolePermission extends Base {
  @ManyToOne(() => Role, role => role.rolePermissions)
  @JoinColumn()
  @AutoMap(() => Role)
  role: Role;

  @ManyToOne(() => Permission, permission => permission.rolePermissions)
  @JoinColumn()
  @AutoMap(() => Permission)
  permission: Permission;
}