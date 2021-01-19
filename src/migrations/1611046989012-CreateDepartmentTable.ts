import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateDepartmentTable1611046989012 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'department',
            columns: [
                {
                    name: 'id',
                    type: 'varchar',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                },
                {
                    name: 'managerId',
                    type: 'varchar',
                    isNullable: true,
                },
                {
                    name: 'isBillable',
                    type: 'boolean',
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
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('department');
    }

}
