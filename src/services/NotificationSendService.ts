import { getCustomRepository } from 'typeorm';
import { AxiosResponse } from 'axios';
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
  }: Request): Promise<AxiosResponse> {
    const studentsRepository = getCustomRepository(StudentsRepository);

    const student = await studentsRepository.findOne({
      where: { matricula: student_id },
    });

    if (!student) {
      throw new AppError('Não autorizado', 401);
    }

    if (!student.admin) {
      throw new AppError('Somente admins estão autorizados', 401);
    }

    if (!title || !body) {
      throw new AppError('Preencha os campos obrigatórios', 401);
    }

    const students = await studentsRepository.findByData({
      turma,
      campus,
      matricula,
    });

    const adress = students.map(user => user.pushtoken);

    try {
      const response = await SendNotification.post('/send', {
        to: adress,
        title,
        body,
      });
      return response.data;
    } catch (err) {
      throw new AppError('Não foi possível enviar a notificação!', 400);
    }
  }
}

export default NotificationSendService;
