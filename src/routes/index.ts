import { Router } from 'express';

import studentsRouter from './students.router';
import notificationsRouter from './notifications.router';

const routes = Router();

routes.use('/students', studentsRouter);
routes.use('/notifications', notificationsRouter);

export default routes;
