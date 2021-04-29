import { getMongoRepository, MongoRepository } from 'typeorm';

import ITicketsRepository from '@modules/tickets/repositories/ITicketsRepository';

import Ticket from '@modules/tickets/infra/typeorm/schemas/Ticket';
import ICreateTicketDTO from '@modules/tickets/dtos/ICreateTicketDTO';
import AppError from '@shared/errors/AppError';

class TicketsRepository implements ITicketsRepository {
  private ormRepository: MongoRepository<Ticket>;

  constructor() {
    this.ormRepository = getMongoRepository(Ticket, 'mongo');
  }

  public async find(): Promise<[Ticket[], number]> {
    const tickets = await this.ormRepository.findAndCount();

    if (tickets[0].length === 0) {
      throw new AppError('Nenhum ticket encontrado');
    }

    return tickets;
  }

  public async findByMatricula(matricula: string): Promise<Ticket[]> {
    const tickets = await this.ormRepository.find({
      where: { matricula },
    });

    if (tickets.length === 0) {
      throw new AppError('Nenhum ticket foi criado por este usuário.', 404);
    }

    return tickets;
  }

  public async delete(id: string): Promise<Ticket> {
    const ticket = await this.ormRepository.findOne(id);

    if (!ticket) {
      throw new AppError('Este ticket não existe', 404);
    }

    await this.ormRepository.delete(ticket);

    return ticket;
  }

  public async create({
    matricula,
    category,
    title,
    body,
  }: ICreateTicketDTO): Promise<Ticket> {
    const ticket = this.ormRepository.create({
      matricula,
      category,
      title,
      body,
    });

    await this.ormRepository.save(ticket);

    return ticket;
  }
}

export default TicketsRepository;
