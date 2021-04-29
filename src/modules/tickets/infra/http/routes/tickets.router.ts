import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import TicketsController from '../controllers/TicketsController';

const ticketsRouter = Router();

const ticketsController = new TicketsController();

ticketsRouter.use(ensureAuthenticated);

ticketsRouter.get('/', ticketsController.show);

ticketsRouter.post('/', ticketsController.create);

ticketsRouter.delete('/', ticketsController.delete);

export default ticketsRouter;
