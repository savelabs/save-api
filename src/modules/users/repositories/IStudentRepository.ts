import Student from '../infra/typeorm/entities/Student';
import ICreateStudentDTO from '../dtos/ICreateStudentDTO';

export default interface IStudentRepository {
  create(data: ICreateStudentDTO): Promise<Student>;
  save(data: ICreateStudentDTO): Promise<Student>;
  findStudentPushtoken(matricula: string): Promise<Student | undefined>;
  findCampusPushtoken(campus: string): Promise<Student[] | undefined>;
  findTurmaPushtoken(turma: string): Promise<Student[] | undefined>;
  findAllPushtoken(): Promise<Student[] | undefined>;
  findByMatricula(matricula: string): Promise<Student | undefined>;
  findAndCount(): Promise<[Student[], number]>;
}
