import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class CreateTokenNotificationStudent1600911615466
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'students',
      new TableColumn({
        name: 'pushtoken',
        type: 'varchar',
        isUnique: true,
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('students', 'pushtoken');
  }
}
