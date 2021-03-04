import { getRepository, Repository, Not, IsNull } from 'typeorm';

import Student from '@modules/users/infra/typeorm/entities/Student';

import IStudentRepository from '@modules/users/repositories/IStudentRepository';
import ICreateStudentDTO from '@modules/users/dtos/ICreateStudentDTO';
import AppError from '@shared/errors/AppError';

class StudentRepository implements IStudentRepository {
  private ormRepository: Repository<Student>;

  constructor() {
    this.ormRepository = getRepository(Student);
  }

  public async findStudentPushtoken(
    matricula: string,
  ): Promise<Student | undefined> {
    const studentMat = await this.ormRepository.findOne({
      where: { matricula, pushtoken: Not(IsNull()) },
    });
    return studentMat;
  }

  public async findCampusPushtoken(
    campus: string,
  ): Promise<Student[] | undefined> {
    const studentMat = await this.ormRepository.find({
      where: { campus, pushtoken: Not(IsNull()) },
    });
    return studentMat;
  }

  public async findTurmaPushtoken(
    turma: string,
  ): Promise<Student[] | undefined> {
    const studentMat = await this.ormRepository.find({
      where: { turma, pushtoken: Not(IsNull()) },
    });
    return studentMat;
  }

  public async findAllPushtoken(): Promise<Student[] | undefined> {
    const studentMat = await this.ormRepository.find({
      where: { pushtoken: Not(IsNull()) },
    });
    return studentMat;
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
