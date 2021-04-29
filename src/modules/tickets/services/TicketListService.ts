import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IStudentRepository from '@modules/users/repositories/IStudentRepository';
import Ticket from '../infra/typeorm/schemas/Ticket';
import ITicketsRepository from '../repositories/ITicketsRepository';

interface Request {
  student_id: string;
  matricula?: string;
}

@injectable()
class TicketListService {
  constructor(
    @inject('StudentRepository')
    private studentsRepository: IStudentRepository,

    @inject('TicketsRepository')
    private ticketsRepository: ITicketsRepository,
  ) {}

  public async execute({
    student_id,
    matricula,
  }: Request): Promise<[Ticket[], number] | Ticket[]> {
    const student = await this.studentsRepository.findByMatricula(student_id);

    if (!student) {
      throw new AppError('Não autorizado.', 401);
    }

    if (!student.admin) {
      throw new AppError('Somente admins estão autorizados.', 401);
    }

    if (matricula) {
      const tickets = this.ticketsRepository.findByMatricula(matricula);
      return tickets;
    }

    const tickets = this.ticketsRepository.find();
    return tickets;
  }
}

export default TicketListService;
