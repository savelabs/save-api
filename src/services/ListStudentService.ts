import { getRepository } from 'typeorm';
import Student from '../models/Student';

import AppError from '../errors/AppError';

interface Request {
  student_id: string;
}

class ListStudentService {
  public async execute({ student_id }: Request): Promise<Student> {
    const studentsRepository = getRepository(Student);

    const student = await studentsRepository.findOne({
      where: { matricula: student_id },
    });

    if (!student) {
      throw new AppError('Não autorizado', 401);
    }

    return student;
  }
}

export default ListStudentService;
