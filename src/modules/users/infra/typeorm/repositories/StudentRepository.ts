import { getRepository, Repository, Not, IsNull } from 'typeorm';

import Student from '@modules/users/infra/typeorm/entities/Student';

import IStudentRepository from '@modules/users/repositories/IStudentRepository';
import ICreateStudentDTO from '@modules/users/dtos/ICreateStudentDTO';
import AppError from '@shared/errors/AppError';

interface Data {
  turma: string | null;
  campus: string | null;
  matricula: string | null;
}

class StudentRepository implements IStudentRepository {
  private ormRepository: Repository<Student>;

  constructor() {
    this.ormRepository = getRepository(Student);
  }

  public async findByData({
    turma = null,
    campus = null,
    matricula = null,
  }: Data): Promise<Student[]> {
    if (turma) {
      const studentTurma = await this.ormRepository.find({
        where: { turma, pushtoken: Not(IsNull()) },
      });

      return studentTurma;
    }
    if (campus) {
      const studentCampus = await this.ormRepository.find({
        where: { campus, pushtoken: Not(IsNull()) },
      });
      return studentCampus;
    }
    if (matricula) {
      const studentMat = await this.ormRepository.find({
        where: { matricula, pushtoken: Not(IsNull()) },
      });
      return studentMat;
    }
    return this.ormRepository.find({ where: { pushtoken: Not(IsNull()) } });
  }

  public async create({
    admin,
    id,
    matricula,
    nomeUsual,
    tipoVinculo,
    cpf,
    situacao,
    dataDeNascimento,
    emailSuap,
    avatarSuap,
    nomeCompleto,
    curso,
    campus,
  }: ICreateStudentDTO): Promise<Student> {
    const student = this.ormRepository.create({
      admin,
      id,
      matricula,
      nomeUsual,
      tipoVinculo,
      cpf,
      situacao,
      dataDeNascimento,
      emailSuap,
      avatarSuap,
      nomeCompleto,
      curso,
      campus,
    });

    await this.ormRepository.save(student);

    return student;
  }

  public async save(student: Student): Promise<Student> {
    if (!student) {
      throw new AppError('Este estudante não existe');
    }

    const studentUpdated = await this.ormRepository.save(student);
    return studentUpdated;
  }

  public async findByMatricula(
    matricula: string,
  ): Promise<Student | undefined> {
    const student = await this.ormRepository.findOne({
      where: { matricula },
    });

    return student;
  }

  public async findAndCount(): Promise<[Student[], number]> {
    const total = await this.ormRepository.findAndCount();
    return total;
  }
}

export default StudentRepository;
