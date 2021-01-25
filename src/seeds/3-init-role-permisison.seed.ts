import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { v4 as uuidv4 } from 'uuid';
import RolePermissionData from '../data/RolePermission';
export default class InitRolesPermissions implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const rolePermissionPreData = [];
    for (const item of RolePermissionData) {
      rolePermissionPreData.push({
        id: uuidv4(),
        roleId: item.roleId,
        permissionId: item.permissionId,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      });
    }
    await connection
      .createQueryBuilder()
      .insert()
      .into('role_permissions_permission')
      .values(rolePermissionPreData)
      .execute();
  }
}
