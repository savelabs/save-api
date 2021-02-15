import Student from '../infra/typeorm/entities/Student';
import ICreateStudentDTO from '../dtos/ICreateStudentDTO';

interface Data {
  turma: string | null;
  campus: string | null;
  matricula: string | null;
}

export default interface IStudentRepository {
  create(data: ICreateStudentDTO): Promise<Student>;
  save(data: ICreateStudentDTO): Promise<Student>;
  findByData({ turma, campus, matricula }: Data): Promise<Student[]>;
  findByMatricula(matricula: string): Promise<Student | undefined>;
  findAndCount(): Promise<[Student[], number]>;
}
