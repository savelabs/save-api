import { Request, Response } from 'express';
import { container } from 'tsyringe';

import TicketCreateService from '@modules/tickets/services/TicketCreateService';
import TicketListService from '@modules/tickets/services/TicketListService';
import AppError from '@shared/errors/AppError';

export default class TicketsController {
  async create(request: Request, response: Response): Promise<Response> {
    const student_id = request.student.id;
    const { category, title, body } = request.body;

    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new AppError('Token não inserido', 401);
    }

    const createTicket = container.resolve(TicketCreateService);

    const createticket = await createTicket.execute({
      matricula: student_id,
      category,
      title,
      body,
    });

    return response.json(createticket);
  }

  async show(request: Request, response: Response): Promise<Response> {
    const student_id = request.student.id;
    const { matricula } = request.query;

    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new AppError('Token não inserido', 401);
    }

    const listTickets = container.resolve(TicketListService);

    const listtickets = await listTickets.execute({
      student_id,
      matricula: !matricula ? undefined : String(matricula),
    });

    return response.json(listtickets);
  }
}
