import ICreateTicketDTO from '../dtos/ICreateTicketDTO';
import Ticket from '../infra/typeorm/schemas/Ticket';

export default interface ITicketsRepository {
  create(data: ICreateTicketDTO): Promise<Ticket>;
  findByMatricula(matricula: string): Promise<Ticket[]>;
  find(): Promise<[Ticket[], number]>;
}
