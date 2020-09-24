import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('students')
class Student {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  matricula: string;

  @Column()
  nomeUsual: string;

  @Column()
  tipoVinculo: string;

  @Column()
  cpf: string;

  @Column()
  dataDeNascimento: string;

  @Column()
  emailSuap: string;

  @Column()
  email: string;

  @Column()
  avatarSuap: string;

  @Column()
  avatarSave: string;

  @Column()
  avatarSaveURL: string;

  @Column()
  nomeCompleto: string;

  @Column()
  curso: string;

  @Column()
  turma: string;

  @Column()
  campus: string;

  @Column()
  situacao: string;

  @Column('boolean')
  admin: boolean;

  @Column()
  pushtoken: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Student;
