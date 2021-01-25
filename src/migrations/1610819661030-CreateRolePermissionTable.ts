import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateRolePermissionTable1610819661030
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'role_permissions_permission',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'roleId',
            type: 'varchar',
          },
          {
            name: 'permissionId',
            type: 'varchar',
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'deletedAt',
            type: 'timestamp',
            isNullable: true,
          },
        ],
      }),
    );

    await Promise.all([
      queryRunner.createForeignKey(
        'role_permissions_permission',
        new TableForeignKey({
          columnNames: ['roleId'],
          referencedColumnNames: ['id'],
          referencedTableName: 'role',
          onDelete: 'CASCADE',
        }),
      ),
      queryRunner.createForeignKey(
        'role_permissions_permission',
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
    await queryRunner.dropTable('role_permissions_permission');
  }
}
