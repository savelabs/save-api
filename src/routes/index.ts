import { Router } from 'express';

import studentsRouter from './students.router';

const routes = Router();

routes.use('/students', studentsRouter);

export default routes;
