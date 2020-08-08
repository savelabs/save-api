import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddAvatarUrlStudent1596738404950
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'students',
      new TableColumn({
        name: 'avatarSaveURL',
        type: 'varchar',
        isUnique: true,
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('students');
  }
}
