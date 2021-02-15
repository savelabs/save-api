import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Student from '../infra/typeorm/entities/Student';
import IStudentRepository from '../repositories/IStudentRepository';

interface Request {
  student_id: string;
}

@injectable()
class ListAdminStudentService {
  constructor(
    @inject('StudentRepository')
    private studentsRepository: IStudentRepository,
  ) {}

  public async execute({ student_id }: Request): Promise<[Student[], number]> {
    const student = await this.studentsRepository.findByMatricula(student_id);

    if (!student) {
      throw new AppError('Não autorizado.', 401);
    }

    if (!student.admin) {
      throw new AppError('Somente admins estão autorizados.', 401);
    }

    const students = this.studentsRepository.findAndCount();

    return students;
  }
}

export default ListAdminStudentService;
