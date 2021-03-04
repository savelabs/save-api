import ICreateNotificationDTO from '../dtos/ICreateNotificationDTO';
import Notification from '../infra/typeorm/schemas/Notification';

export default interface INotificationsRepository {
  create(data: ICreateNotificationDTO): Promise<Notification>;
  findByMatricula(matricula: string): Promise<Notification[]>;
  deleteOne(id: string): Promise<Notification>;
  deleteAll(student_id: string): Promise<Notification[]>;
}
