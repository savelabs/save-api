import { Request, Response } from 'express';
import { container } from 'tsyringe';

import NotificationTokenService from '@modules/notifications/services/NotificationTokenService';
import NotificationSaveService from '@modules/notifications/services/NotificationSaveService';
import NotificationDeleteService from '@modules/notifications/services/NotificationDeleteService';
import AppError from '@shared/errors/AppError';

export default class NotificationsController {
  async register(request: Request, response: Response): Promise<Response> {
    const student_id = request.student.id;
    const { pushtoken, authorized } = request.body;

    const registerToken = container.resolve(NotificationTokenService);

    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new AppError('Token não inserido', 401);
    }

    const [, token] = authHeader.split(' ');

    const registertoken = await registerToken.execute({
      student_id,
      pushtoken,
      authorized,
      token,
    });

    return response.json(registertoken);
  }

  async send(request: Request, response: Response): Promise<Response> {
    const student_id = request.student.id;
    const { title, body, turma, campus, matricula } = request.body;

    const notificationSend = container.resolve(NotificationSaveService);

    const notificationsend = await notificationSend.execute({
      student_id,
      title,
      body,
      turma,
      campus,
      matricula,
    });

    return response.json(notificationsend);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const student_id = request.student.id;
    const { id, all } = request.query;

    const notificationDelete = container.resolve(NotificationDeleteService);

    const notificationdelete = await notificationDelete.execute({
      student_id,
      id: String(id),
      all: Boolean(all),
    });

    return response.json(notificationdelete);
  }
}
