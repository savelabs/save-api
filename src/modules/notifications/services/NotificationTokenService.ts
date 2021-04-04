import { injectable, inject } from 'tsyringe';

import Student from '@modules/users/infra/typeorm/entities/Student';
import IStudentRepository from '@modules/users/repositories/IStudentRepository';

import AppError from '@shared/errors/AppError';
import { TokenQueue } from '../infra/queues/NotifyQueue';

interface Request {
  pushtoken: string;
  student_id: string;
  authorized?: boolean;
  token: string;
}

@injectable()
class NotificationTokenService {
  constructor(
    @inject('StudentRepository') private studentsRepository: IStudentRepository,
  ) {}

  public async execute({
    student_id,
    pushtoken,
    authorized,
    token,
  }: Request): Promise<Student> {
    const student = await this.studentsRepository.findByMatricula(student_id);

    if (!student) {
      throw new AppError('Não autorizado.', 401);
    }

    student.token = token;

    if (authorized) {
      if (student.notification) {
        throw new AppError('Notificação já ativada');
      }
    }

    student.notification = authorized;

    if (authorized) {
      await TokenQueue.add(
        {
          student_id,
          havePush: true,
          token,
        },
        { repeat: { every: 60000 }, jobId: student_id }, // 15 minutos
      );
    }

    if (authorized === false) {
      await TokenQueue.removeRepeatable({
        every: 60000,
        jobId: student_id,
      });
    }

    if (pushtoken) {
      student.notification = authorized;
      student.pushtoken = pushtoken;
      const studentUpdated = await this.studentsRepository.save(student);
      return studentUpdated;
    }

    const studentUpdated = await this.studentsRepository.save(student);
    return studentUpdated;
  }
}

export default NotificationTokenService;
