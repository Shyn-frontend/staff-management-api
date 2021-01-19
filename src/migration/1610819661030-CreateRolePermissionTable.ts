import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateRolePermissionTable1610819661030 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'role_permission',
            columns: [
                {
                    name: 'id',
                    type: 'varchar',
                    isPrimary: true,
                },
                {
                    name: 'roleId',
                    type: 'varchar',
                },
                {
                    name: 'permissionId',
                    type: 'varchar',
                }
            ]
        }));

        await Promise.all([
            queryRunner.createForeignKey(
                'role_permission',
                new TableForeignKey({
                    columnNames: ['roleId'],
                    referencedColumnNames: ['id'],
                    referencedTableName: 'role',
                    onDelete: 'CASCADE',
                }),
            ),
            queryRunner.createForeignKey(
                'role_permission',
                new TableForeignKey({
                    columnNames: ['permissionId'],
                    referencedColumnNames: ['id'],
                    referencedTableName: 'permission',
                    onDelete: 'CASCADE',
                }),
            ),
        ]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
