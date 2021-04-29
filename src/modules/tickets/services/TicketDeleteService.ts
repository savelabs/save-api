import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IStudentRepository from '@modules/users/repositories/IStudentRepository';
import Ticket from '../infra/typeorm/schemas/Ticket';
import ITicketsRepository from '../repositories/ITicketsRepository';

interface Request {
  student_id: string;
  id?: string;
}

@injectable()
class TicketDeleteService {
  constructor(
    @inject('StudentRepository')
    private studentsRepository: IStudentRepository,

    @inject('TicketsRepository')
    private ticketsRepository: ITicketsRepository,
  ) {}

  public async execute({ student_id, id }: Request): Promise<Ticket> {
    const student = await this.studentsRepository.findByMatricula(student_id);

    if (!student) {
      throw new AppError('Não autorizado.', 401);
    }

    if (!id) {
      throw new AppError('Este ticket não existe', 404);
    }

    const ticket = this.ticketsRepository.delete(id);
    return ticket;
  }
}

export default TicketDeleteService;
