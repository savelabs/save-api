import { Router } from 'express';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import NotificationTokenService from '../services/NotificationTokenService';
import NotificationSendService from '../services/NotificationSendService';

const notificationsRouter = Router();

notificationsRouter.post(
  '/',
  ensureAuthenticated,
  async (request, response) => {
    const student_id = request.student.id;
    const { pushtoken } = request.body;

    const registerToken = new NotificationTokenService();

    const registertoken = await registerToken.execute({
      student_id,
      pushtoken,
    });

    return response.json(registertoken);
  },
);

notificationsRouter.post(
  '/send',
  ensureAuthenticated,
  async (request, response) => {
    const student_id = request.student.id;
    const { title, body, turma, campus, matricula } = request.body;

    const notificationSend = new NotificationSendService();

    const notificationsend = await notificationSend.execute({
      student_id,
      title,
      body,
      turma,
      campus,
      matricula,
    });

    return response.json(notificationsend);
  },
);

export default notificationsRouter;
