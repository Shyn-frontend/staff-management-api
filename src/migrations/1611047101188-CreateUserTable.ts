import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
  TableIndex,
} from 'typeorm';
import getEnum from '../shared/utils/getEnum';

enum USER_TYPE {
  ADMIN = 'admin',
  CLIENT = 'client',
  EMPLOYEE = 'employee',
  MANAGER = 'manager',
  PLACEHOLDER = 'placeholder',
}

export class CreateUserTable1611047101188 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'email',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'password',
            type: 'varchar',
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'type',
            type: 'enum',
            enum: getEnum(USER_TYPE),
            default: `'${USER_TYPE.EMPLOYEE}'`,
          },
          {
            name: 'positionId',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'roleId',
            type: 'varchar',
          },
          {
            name: 'avatar',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'isArchived',
            type: 'boolean',
            default: false,
          },
          {
            name: 'permanentLeaveAt',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'isComplete',
            type: 'boolean',
            default: false,
          },
          {
            name: 'isPermanent',
            type: 'boolean',
            default: true,
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
      queryRunner.createIndex(
        'user',
        new TableIndex({
          name: 'IDX_Id',
          columnNames: ['id'],
        }),
      ),
      queryRunner.createIndex(
        'user',
        new TableIndex({
          name: 'IDX_Email',
          columnNames: ['email'],
        }),
      ),
      queryRunner.createIndex(
        'user',
        new TableIndex({
          name: 'IDX_Type',
          columnNames: ['type'],
        }),
      ),
      queryRunner.createForeignKey(
        'user',
        new TableForeignKey({
          columnNames: ['positionId'],
          referencedColumnNames: ['id'],
          referencedTableName: 'position',
          onDelete: 'CASCADE',
        }),
      ),
      queryRunner.createForeignKey(
        'user',
        new TableForeignKey({
          columnNames: ['roleId'],
          referencedColumnNames: ['id'],
          referencedTableName: 'role',
          onDelete: 'CASCADE',
        }),
      ),
      queryRunner.createForeignKey(
        'department',
        new TableForeignKey({
          columnNames: ['managerId'],
          referencedColumnNames: ['id'],
          referencedTableName: 'user',
          onDelete: 'CASCADE',
        }),
      ),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user');
  }
}
