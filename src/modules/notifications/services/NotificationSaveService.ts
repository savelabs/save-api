import { injectable, inject } from 'tsyringe';

import Student from '@modules/users/infra/typeorm/entities/Student';
import IStudentRepository from '@modules/users/repositories/IStudentRepository';

import AppError from '@shared/errors/AppError';
import NotifyQueue from '../infra/queues/NotifyQueue';

interface Request {
  student_id: string;
  title: string;
  body: string;
  campus?: string;
  matricula?: string;
  turma?: string;
}

interface Message {
  message: string;
}

@injectable()
class NotificationSaveService {
  constructor(
    @inject('StudentRepository') private studentsRepository: IStudentRepository,
  ) {}

  public async execute({
    student_id,
    title,
    body,
    campus = undefined,
    matricula = undefined,
    turma = undefined,
  }: Request): Promise<Message> {
    const student = await this.studentsRepository.findByMatricula(student_id);
    const studentsSend: Student[] = [];

    if (!student) {
      throw new AppError('Não autorizado.', 401);
    }

    if (!student.admin) {
      throw new AppError('Somente autorizado para admins.', 401);
    }

    if (!campus && !matricula && !turma) {
      const allStudents = await this.studentsRepository.findAllPushtoken();
      if (allStudents) {
        allStudents.map(s => studentsSend.push(s));
      }
    }

    if (matricula) {
      const findByMatricula = await this.studentsRepository.findStudentPushtoken(
        matricula,
      );
      if (findByMatricula) {
        studentsSend.push(findByMatricula);
      }
    }

    if (campus) {
      const studentsCampus = await this.studentsRepository.findCampusPushtoken(
        campus,
      );
      if (studentsCampus) {
        studentsCampus.map(s => studentsSend.push(s));
      }
    }

    if (turma) {
      const studentsTurma = await this.studentsRepository.findTurmaPushtoken(
        turma,
      );
      if (studentsTurma) {
        studentsTurma.map(s => studentsSend.push(s));
      }
    }

    if (studentsSend.length === 0) {
      throw new AppError(
        'Nenhum estudante foi encontrado para o envio da notificação',
        404,
      );
    }

    studentsSend.map(async studentID => {
      await NotifyQueue.add({
        student_id: studentID.matricula,
        title,
        body,
        tags: 'save',
      });
    });

    return {
      message: `Foi adicionado na fila ${studentsSend.length} notificações`,
    };
  }
}

export default NotificationSaveService;
