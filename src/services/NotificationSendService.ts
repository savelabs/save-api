import { getCustomRepository } from 'typeorm';
import { SendNotification } from './api';
import StudentsRepository from '../repositories/StudentRepository';

import AppError from '../errors/AppError';

interface Request {
  student_id: string;
  title: string;
  body: string;
  turma: string | null;
  campus: string | null;
  matricula: string | null;
}

class NotificationSendService {
  public async execute({
    student_id,
    title,
    body,
    turma = null,
    campus = null,
    matricula = null,
  }: Request): Promise<any> {
    const studentsRepository = getCustomRepository(StudentsRepository);

    const student = await studentsRepository.findOne({
      where: { matricula: student_id },
    });

    if (!student) {
      throw new AppError('Não autorizado.', 401);
    }

    if (!student.admin) {
      throw new AppError('Somente admins estão autorizados.', 401);
    }

    if (!title || !body) {
      throw new AppError('Preencha os campos obrigatórios.', 401);
    }

    const students = await studentsRepository.findByData({
      turma,
      campus,
      matricula,
    });

    const batch: Array<any> = [];
    const adress = students.map(user => user.pushtoken);
    const lenghtAdress = adress.length;
    let i = 0;

    for (i = 0; i < lenghtAdress; i += 100) {
      const myArray = adress.slice(i, i + 100);
      batch.push(myArray);
    }

    batch.map(async (adresses: Array<string>) => {
      try {
        const response = await SendNotification.post('/send', {
          to: adresses,
          title,
          body,
        });
        return response.data;
      } catch (err) {
        throw new AppError('Não foi possível enviar a notificação!', 400);
      }
    });

    return { message: 'Enviado com sucesso!' };
  }
}

export default NotificationSendService;
