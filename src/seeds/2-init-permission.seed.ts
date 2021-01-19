import { Connection } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";
import { PermissionEntity } from "../entities/permission.entity";

const PermissionData = require('../data/Permission');

export default class InitPermissions implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const permissionPreData = [];
    for (const item of PermissionData) {
      permissionPreData.push({
        id: item.id,
        name: item.name,
        action: item.action,
      });
    }
    await connection
      .createQueryBuilder()
      .insert()
      .into(PermissionEntity)
      .values(permissionPreData)
      .execute();
  }
}