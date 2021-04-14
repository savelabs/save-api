import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IStudentRepository from '@modules/users/repositories/IStudentRepository';
import INotificationsRepository from '../repositories/INotificationsRepository';
import Notification from '../infra/typeorm/schemas/Notification';

interface Request {
  student_id: string;
  id: string;
  all: boolean;
}

@injectable()
class NotificationDeleteService {
  constructor(
    @inject('StudentRepository') private studentsRepository: IStudentRepository,
    @inject('NotificationRepository')
    private notificationsRepository: INotificationsRepository,
  ) {}

  public async execute({
    student_id,
    id,
    all = false,
  }: Request): Promise<Notification | Notification[]> {
    const student = await this.studentsRepository.findByMatricula(student_id);

    if (!student) {
      throw new AppError('Não autorizado.', 401);
    }

    const checkExists = await this.notificationsRepository.findByMatricula(
      student.matricula,
    );

    if (!checkExists) {
      throw new AppError('Nenhuma notificação disponível', 404);
    }

    if (all) {
      const deleted = await this.notificationsRepository.deleteAll(student_id);
      return deleted;
    }

    const deletedNotifications = await this.notificationsRepository.deleteOne(
      id,
    );
    return deletedNotifications;
  }
}

export default NotificationDeleteService;
