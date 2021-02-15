import { injectable, inject } from 'tsyringe';

import IStudentRepository from '@modules/users/repositories/IStudentRepository';
import AppError from '@shared/errors/AppError';
import { SendNotification } from '@shared/infra/http/api';

interface Request {
  student_id: string;
  title: string;
  body: string;
  turma: string | null;
  campus: string | null;
  matricula: string | null;
}

@injectable()
class NotificationSendService {
  constructor(
    @inject('StudentRepository')
    private studentsRepository: IStudentRepository,
  ) {}

  public async execute({
    student_id,
    title,
    body,
    turma = null,
    campus = null,
    matricula = null,
  }: Request): Promise<any> {
    const student = await this.studentsRepository.findByMatricula(student_id);

    if (!student) {
      throw new AppError('Não autorizado.', 401);
    }

    if (!student.admin) {
      throw new AppError('Somente admins estão autorizados.', 401);
    }

    if (!title || !body) {
      throw new AppError('Preencha os campos obrigatórios.', 401);
    }

    const students = await this.studentsRepository.findByData({
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
