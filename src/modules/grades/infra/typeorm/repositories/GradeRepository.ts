import { getMongoRepository, MongoRepository } from 'typeorm';

import IGradeRepository from '@modules/grades/repositories/IGradeRepository';
import AppError from '@shared/errors/AppError';

import Grade from '@modules/grades/infra/typeorm/schemas/Grade';
import ICreateGradeDTO from '@modules/grades/dtos/CreateGradeDTO';

class GradeRepository implements IGradeRepository {
  private ormRepository: MongoRepository<Grade>;

  constructor() {
    this.ormRepository = getMongoRepository(Grade, 'mongo');
  }

  public async create({
    matricula,
    periodo,
    boletins,
  }: ICreateGradeDTO): Promise<Grade> {
    const grade = this.ormRepository.create({
      matricula,
      periodo,
      boletins,
    });

    await this.ormRepository.save(grade);

    return grade;
  }

  public async update({
    matricula,
    periodo,
    boletins,
  }: ICreateGradeDTO): Promise<Grade> {
    const grade = await this.ormRepository.findOne({
      where: { matricula },
    });

    if (!grade) {
      throw new AppError('Este boletim não existe');
    }

    grade.matricula = matricula;
    grade.boletins = boletins;
    grade.periodo = periodo;

    const gradeUpdated = await this.ormRepository.save(grade);
    return gradeUpdated;
  }

  public async checkExists(matricula: string): Promise<Grade | undefined> {
    const grade = await this.ormRepository.findOne({
      where: { matricula },
    });

    return grade;
  }
}

export default GradeRepository;
