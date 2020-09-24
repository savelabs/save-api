import { EntityRepository, Repository } from 'typeorm';

import Student from '../models/Student';

interface Data {
  turma: string | null;
  campus: string | null;
  matricula: string | null;
}

@EntityRepository(Student)
class StudentRepository extends Repository<Student> {
  public async findByData({
    turma = null,
    campus = null,
    matricula = null,
  }: Data): Promise<Student[]> {
    if (turma) {
      const studentTurma = await this.find({
        where: { turma },
      });
      return studentTurma;
    }
    if (campus) {
      const studentCampus = await this.find({
        where: { campus },
      });
      return studentCampus;
    }
    if (matricula) {
      const studentMat = await this.find({
        where: { matricula },
      });
      return studentMat;
    }
    return this.find();
  }
}

export default StudentRepository;
