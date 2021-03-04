import { Request, Response } from 'express';
import { container } from 'tsyringe';

import NotificationTokenService from '@modules/notifications/services/NotificationTokenService';
import NotificationSaveService from '@modules/notifications/services/NotificationSaveService';
import NotificationDeleteService from '@modules/notifications/services/NotificationDeleteService';

export default class NotificationsController {
  async register(request: Request, response: Response): Promise<Response> {
    const student_id = request.student.id;
    const { pushtoken } = request.body;

    const registerToken = container.resolve(NotificationTokenService);

    const registertoken = await registerToken.execute({
      student_id,
      pushtoken,
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
    const { id, all } = request.body;

    const notificationDelete = container.resolve(NotificationDeleteService);

    const notificationdelete = await notificationDelete.execute({
      student_id,
      id,
      all,
    });

    return response.json(notificationdelete);
  }
}
