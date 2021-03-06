import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import DepartmentData from '../data/Department';
import PositionData from '../data/Position';

export default class InitPositionDepartment implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const departmentPrepareData = [];
    for (const item of DepartmentData) {
      departmentPrepareData.push({
        id: item.id,
        name: item.name,
        isBillable: item.isBillable,
        managerId: item.managerId,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      });
    }
    await connection
      .createQueryBuilder()
      .insert()
      .into('department')
      .values(departmentPrepareData)
      .execute();

    const positionPrepareData = [];
    for (const item of PositionData) {
      positionPrepareData.push({
        id: item.id,
        name: item.name,
        departmentId: item.departmentId,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      });
    }
    await connection
      .createQueryBuilder()
      .insert()
      .into('position')
      .values(positionPrepareData)
      .execute();
  }
}
