import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class RemoveUniqueForAvatar1600532295372
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('students', 'avatarSuap');
    await queryRunner.dropColumn('students', 'avatarSaveURL');
    await queryRunner.dropColumn('students', 'avatarSave');
    await queryRunner.addColumn(
      'students',
      new TableColumn({
        name: 'avatarSuap',
        type: 'varchar',
      }),
    );
    await queryRunner.addColumn(
      'students',
      new TableColumn({
        name: 'avatarSaveURL',
        type: 'varchar',
        isNullable: true,
      }),
    );
    await queryRunner.addColumn(
      'students',
      new TableColumn({
        name: 'avatarSave',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('studentes', 'avatarSave');
    await queryRunner.dropColumn('studentes', 'avatarSaveURL');
    await queryRunner.dropColumn('studentes', 'avatarSuap');
  }
}
