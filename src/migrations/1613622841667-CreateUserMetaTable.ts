import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
  TableIndex,
} from 'typeorm';
import getEnum from '../shared/utils/getEnum';

const CLIENT_META_FIELDS = [
  'targetSales',
  'preferredMarginPercent',
  'ownerId',
  'code',
  'totalProjects',
  'onGoingProjects',
  'currentSales',
  'upComingProjects',
];
const USER_META_FIELDS = [
  'employeeNo',
  'hourlyRate',
  'weeklyHours',
  'contractStart',
  'contractEnd',
  ...CLIENT_META_FIELDS,
];

export class CreateUserTable1611047101188 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user_meta',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'userId',
            type: 'varchar',
          },
          {
            name: 'key',
            type: 'enum',
            enum: getEnum(USER_META_FIELDS),
          },
          {
            name: 'value',
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
      queryRunner.createIndex(
        'user_meta',
        new TableIndex({
          name: 'IDX_Id',
          columnNames: ['userId'],
        }),
      ),
      queryRunner.createForeignKey(
        'user_meta',
        new TableForeignKey({
          columnNames: ['userId'],
          referencedColumnNames: ['id'],
          referencedTableName: 'user',
          onDelete: 'CASCADE',
        }),
      ),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user_meta');
  }
}
