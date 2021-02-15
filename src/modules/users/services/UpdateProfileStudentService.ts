import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Student from '../infra/typeorm/entities/Student';
import IStudentRepository from '../repositories/IStudentRepository';

interface Request {
  student_id: string;
  email: string | undefined;
  turma: string | undefined;
}

@injectable()
class UpdateAvatarStudentService {
  constructor(
    @inject('StudentRepository')
    private studentsRepository: IStudentRepository,
  ) {}

  public async execute({
    student_id,
    email,
    turma,
  }: Request): Promise<Student> {
    const student = await this.studentsRepository.findByMatricula(student_id);

    if (!student) {
      throw new AppError(
        'Somente estudantes autenticados podem alterar dados.',
        401,
      );
    }

    if (email) {
      student.email = email;
    }

    if (turma) {
      student.turma = turma;
    }

    const studentUpdated = await this.studentsRepository.save(student);

    return studentUpdated;
  }
}

export default UpdateAvatarStudentService;
