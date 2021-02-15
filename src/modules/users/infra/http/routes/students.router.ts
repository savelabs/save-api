import { Router } from 'express';

import upload from '@config/upload';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import StudentsController from '../controllers/StudentsController';
import AvatarController from '../controllers/AvatarController';

const studentsRouter = Router();
const studentsController = new StudentsController();
const avatarController = new AvatarController();

studentsRouter.get('/', studentsController.create);
studentsRouter.get('/profile', ensureAuthenticated, studentsController.show);
studentsRouter.put('/profile', ensureAuthenticated, studentsController.update);
studentsRouter.get(
  '/profiles',
  ensureAuthenticated,
  studentsController.showAdmin,
);

studentsRouter.put(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  avatarController.update,
);
studentsRouter.delete('/avatar', ensureAuthenticated, avatarController.delete);

export default studentsRouter;
