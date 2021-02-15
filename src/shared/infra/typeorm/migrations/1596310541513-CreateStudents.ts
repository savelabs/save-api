import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateStudents1596127711397 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'students',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'matricula',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'nomeUsual',
            type: 'varchar',
          },
          {
            name: 'tipoVinculo',
            type: 'varchar',
          },
          {
            name: 'cpf',
            type: 'varchar',
          },
          {
            name: 'dataDeNascimento',
            type: 'varchar',
          },
          {
            name: 'emailSuap',
            type: 'varchar',
            isUnique: false,
          },
          {
            name: 'email',
            type: 'varchar',
            isUnique: true,
            isNullable: true,
          },
          {
            name: 'avatarSuap',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'avatarSave',
            type: 'varchar',
            isUnique: true,
            isNullable: true,
          },
          {
            name: 'nomeCompleto',
            type: 'varchar',
          },
          {
            name: 'curso',
            type: 'varchar',
          },
          {
            name: 'turma',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'campus',
            type: 'varchar',
          },
          {
            name: 'situacao',
            type: 'varchar',
          },
          {
            name: 'admin',
            type: 'boolean',
            default: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('students');
  }
}
