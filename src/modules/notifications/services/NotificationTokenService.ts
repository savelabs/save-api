import { injectable, inject } from 'tsyringe';

import Student from '@modules/users/infra/typeorm/entities/Student';
import IStudentRepository from '@modules/users/repositories/IStudentRepository';

import AppError from '@shared/errors/AppError';

interface Request {
  pushtoken: string;
  student_id: string;
}

@injectable()
class NotificationTokenService {
  constructor(
    @inject('StudentRepository') private studentsRepository: IStudentRepository,
  ) {}

  public async execute({ student_id, pushtoken }: Request): Promise<Student> {
    const student = await this.studentsRepository.findByMatricula(student_id);

    if (!student) {
      throw new AppError('Não autorizado.', 401);
    }

    student.pushtoken = pushtoken;

    const studentUpdated = await this.studentsRepository.save(student);
    return studentUpdated;
  }
}

export default NotificationTokenService;
