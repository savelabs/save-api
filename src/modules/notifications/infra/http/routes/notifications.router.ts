import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import NotificationsController from '../controllers/NotificationsController';

const notificationsRouter = Router();
const notificationsController = new NotificationsController();

notificationsRouter.use(ensureAuthenticated);

notificationsRouter.post('/', notificationsController.register);

notificationsRouter.post('/send', notificationsController.send);

export default notificationsRouter;
