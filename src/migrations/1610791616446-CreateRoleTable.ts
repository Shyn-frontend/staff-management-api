import { MigrationInterface, QueryRunner, Table, TableIndex } from "typeorm";
import getEnum from '../shared/utils/getEnum';

enum ROLES {
    ADMIN_ROLE = 'Admin',
    HR_ADMIN_ROLE = 'HR Admin',
    TEAM_HEAD_ROLE = 'Team Head',
    PROJECT_ADMIN_ROLE = 'Project Admin',
    PROJECT_MANAGER_ROLE = 'Project Manager',
    EMPLOYEE_ROLE = 'Employee',
    CLIENT_ROLE = 'Client',
}

export class CreateRoleTable1610791616446 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'role',
            columns: [
                {
                    name: 'id',
                    type: 'varchar',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                },
                {
                    name: 'name',
                    type: 'enum',
                    enum: getEnum(ROLES),
                    default: `'${ROLES.EMPLOYEE_ROLE}'`
                },
                {
                    name: 'order',
                    type: 'integer',
                },
                {
                    name: 'createdAt',
                    type: 'timestamp',
                    default: 'now()'
                },
                {
                    name: 'updatedAt',
                    type: 'timestamp',
                    default: 'now()'
                },
                {
                    name: 'deletedAt',
                    type: 'timestamp',
                    isNullable: true,
                }
            ]
        }));

        await queryRunner.createIndex("role", new TableIndex({
            name: "IDX_Id",
            columnNames: ["id"]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('role');
    }

}
