import { getRepository } from 'typeorm';
import Student from '../models/Student';

import AppError from '../errors/AppError';

interface Request {
  student_id: string;
}

class ListAdminStudentService {
  public async execute({ student_id }: Request): Promise<[Student[], number]> {
    const studentsRepository = getRepository(Student);

    const student = await studentsRepository.findOne({
      where: { matricula: student_id },
    });

    if (!student) {
      throw new AppError('Não autorizado.', 401);
    }

    if (!student.admin) {
      throw new AppError('Somente admins estão autorizados.', 401);
    }

    const students = studentsRepository.findAndCount();

    return students;
  }
}

export default ListAdminStudentService;
