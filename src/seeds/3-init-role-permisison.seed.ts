import { RolePermissionEntity } from "../entities/role-permission.entity";
import { Connection } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";

const RolePermissionPreData = require('../data/RolePermission');

export default class InitRolesPermissions implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const rolePermissionPreData = [];
    for (const item of RolePermissionPreData) {
      rolePermissionPreData.push({
        id: item.id,
        roleId: item.roleId,
        permissionId: item.permissionId,
      });
    }
    await connection
      .createQueryBuilder()
      .insert()
      .into(RolePermissionEntity)
      .values(rolePermissionPreData)
      .execute();
  }
}