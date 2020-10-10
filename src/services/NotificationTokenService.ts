import { getRepository } from 'typeorm';
import Student from '../models/Student';

import AppError from '../errors/AppError';

interface Request {
  pushtoken: string;
  student_id: string;
}

class NotificationTokenService {
  public async execute({ student_id, pushtoken }: Request): Promise<Student> {
    const studentsRepository = getRepository(Student);

    const student = await studentsRepository.findOne({
      where: { matricula: student_id },
    });

    if (!student) {
      throw new AppError('Não autorizado.', 401);
    }

    student.pushtoken = pushtoken;
    await studentsRepository.save(student);

    return student;
  }
}

export default NotificationTokenService;
