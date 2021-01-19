import { Connection } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";

const AdminData = require('../data/AdminUser');

export default class InitAdminUsers implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const adminPreData = [];
    for (const item of AdminData) {
      adminPreData.push({
        id: item.id,
        email: item.email,
        password: item.password,
        name: item.name,
        type: item.type,
        positionId: null,
        roleId: item.roleId,
        avatar: item.avatar,
        isArchived: false,
        permanentLeaveAt: null,
        isComplete: true,
        isPermanent: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      });
    }
    await connection
      .createQueryBuilder()
      .insert()
      .into('user')
      .values(adminPreData)
      .execute();
  }
}