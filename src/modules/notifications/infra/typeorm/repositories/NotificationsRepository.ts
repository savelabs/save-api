import { getMongoRepository, MongoRepository } from 'typeorm';

import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';

import Notification from '@modules/notifications/infra/typeorm/schemas/Notification';
import ICreateNotificationDTO from '@modules/notifications/dtos/ICreateNotificationDTO';
import AppError from '@shared/errors/AppError';

class NotificationsRepository implements INotificationsRepository {
  private ormRepository: MongoRepository<Notification>;

  constructor() {
    this.ormRepository = getMongoRepository(Notification, 'mongo');
  }

  public async findByMatricula(matricula: string): Promise<Notification[]> {
    const notifications = await this.ormRepository.find({
      where: { student_id: matricula },
    });

    if (notifications.length === 0) {
      throw new AppError('Nenhuma notificação disponível', 404);
    }

    return notifications;
  }

  public async create({
    title,
    content,
    student_id,
    tags,
    completedAt,
  }: ICreateNotificationDTO): Promise<Notification> {
    const notification = this.ormRepository.create({
      title,
      content,
      student_id,
      tags,
      completedAt,
    });

    await this.ormRepository.save(notification);

    return notification;
  }

  public async deleteOne(id: string): Promise<Notification> {
    const notification = await this.ormRepository.findOne(id);

    if (!notification) {
      throw new AppError('Esta notificação não existe', 404);
    }

    await this.ormRepository.delete(notification);

    return notification;
  }

  public async deleteAll(student_id: string): Promise<Notification[]> {
    const notifications = await this.ormRepository.find({
      where: { student_id },
    });

    if (!notifications) {
      throw new AppError('Nenhuma notificação encontrada', 404);
    }

    const removedNotifications = await this.ormRepository.remove(notifications);

    return removedNotifications;
  }
}

export default NotificationsRepository;
