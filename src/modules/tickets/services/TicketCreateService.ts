import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IStudentRepository from '@modules/users/repositories/IStudentRepository';
import Ticket from '../infra/typeorm/schemas/Ticket';
import ITicketsRepository from '../repositories/ITicketsRepository';

interface Request {
  matricula: string;
  category: string;
  title: string;
  body: string;
}

@injectable()
class TicketCreateService {
  constructor(
    @inject('StudentRepository')
    private studentsRepository: IStudentRepository,

    @inject('TicketsRepository')
    private ticketsRepository: ITicketsRepository,
  ) {}

  public async execute({
    matricula,
    category,
    title,
    body,
  }: Request): Promise<Ticket> {
    const student = await this.studentsRepository.findByMatricula(matricula);

    if (!student) {
      throw new AppError('Não autorizado.', 401);
    }

    if (!matricula || !category || !title || !body) {
      throw new AppError('Por favor, preencha todos os campos.', 401);
    }

    const ticket = this.ticketsRepository.create({
      matricula,
      category,
      title,
      body,
    });

    return ticket;
  }
}

export default TicketCreateService;
