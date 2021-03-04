import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import GradeController from '@modules/grades/infra/http/controllers/GradeController';
import NotificationsController from '../controllers/NotificationsController';

const notificationsRouter = Router();

const notificationsController = new NotificationsController();
const gradesController = new GradeController();

notificationsRouter.use(ensureAuthenticated);

notificationsRouter.get('/', gradesController.create);

notificationsRouter.delete('/', notificationsController.delete);

notificationsRouter.post('/', notificationsController.register);

notificationsRouter.post('/send', notificationsController.send);

export default notificationsRouter;
