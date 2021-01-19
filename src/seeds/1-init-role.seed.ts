import { Connection } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";

const RoleData = require('../data/Role');

export default class InitRoles implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const rolePrepareData = [];
    for (const item of RoleData) {
      rolePrepareData.push({
        id: item.id,
        name: item.name,
        order: item.order,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      });
    }
    await connection
      .createQueryBuilder()
      .insert()
      .into('role')
      .values(rolePrepareData)
      .execute();
  }
}