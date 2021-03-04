import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import { SendNotification } from '@shared/infra/http/api';

import IStudentRepository from '@modules/users/repositories/IStudentRepository';
import INotificationsRepository from '../repositories/INotificationsRepository';
import ISendNotificationDTO from '../dtos/ISendNotificationDTO';

import Notification from '../infra/typeorm/schemas/Notification';

@injectable()
class NotificationSendService {
  constructor(
    @inject('StudentRepository')
    private studentsRepository: IStudentRepository,

    @inject('NotificationRepository')
    private notificationsRepository: INotificationsRepository,
  ) {}

  public async execute({
    student_id,
    title,
    body,
    tags = 'save',
  }: ISendNotificationDTO): Promise<Notification> {
    if (!title && !body) {
      throw new AppError('Preencha os campos obrigatórios.', 401);
    }

    const student = await this.studentsRepository.findStudentPushtoken(
      student_id,
    );

    if (!student) {
      throw new AppError('O estudante não possuí pushtoken cadastrado.', 404);
    }

    await SendNotification.post('/send', {
      to: student.pushtoken,
      title,
      body,
    });

    const notifications = await this.notificationsRepository.create({
      title,
      content: body,
      student_id: student.matricula,
      tags,
      completedAt: Date.now(),
    });

    return notifications;
  }
}

export default NotificationSendService;
