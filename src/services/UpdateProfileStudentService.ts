import { getRepository } from 'typeorm';
import Student from '../models/Student';

import AppError from '../errors/AppError';

interface Request {
  student_id: string;
  email: string | undefined;
  turma: string | undefined;
}

class UpdateAvatarStudentService {
  public async execute({
    student_id,
    email,
    turma,
  }: Request): Promise<Student> {
    const studentsRepository = getRepository(Student);

    const student = await studentsRepository.findOne({
      where: { matricula: student_id },
    });

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

    await studentsRepository.save(student);

    return student;
  }
}

export default UpdateAvatarStudentService;
