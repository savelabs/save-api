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

  @Column({ nullable: true })
  email?: string;

  @Column()
  avatarSuap: string;

  @Column({ nullable: true })
  avatarSave?: string;

  @Column({ nullable: true })
  avatarSaveURL?: string;

  @Column()
  nomeCompleto: string;

  @Column()
  curso: string;

  @Column({ nullable: true })
  turma?: string;

  @Column()
  campus: string;

  @Column()
  situacao: string;

  @Column('boolean')
  admin: boolean;

  @Column({ nullable: true })
  pushtoken?: string;

  @Column({ nullable: true })
  notification?: boolean;

  @Column({ nullable: true })
  token?: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Student;
