import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreatePositionTable1611047101187 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'position',
            columns: [
                {
                    name: 'id',
                    type: 'varchar',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                },
                {
                    name: 'name',
                    type: 'varchar',
                },
                {
                    name: 'departmentId',
                    type: 'varchar',
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

        await queryRunner.createForeignKey(
            'position',
            new TableForeignKey({
                columnNames: ['departmentId'],
                referencedColumnNames: ['id'],
                referencedTableName: 'department',
                onDelete: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('position');
    }

}
