import { Connection } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";
import PermissionData from '../data/Permission';

export default class InitPermissions implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const permissionPreData = [];
    for (const item of PermissionData) {
      permissionPreData.push({
        id: item.id,
        name: item.name,
        action: item.action,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      });
    }
    await connection
      .createQueryBuilder()
      .insert()
      .into('permission')
      .values(permissionPreData)
      .execute();
  }
}