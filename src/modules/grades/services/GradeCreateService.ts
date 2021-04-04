import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import { SuapApi } from '@shared/infra/http/api';

import IGradeRepository from '@modules/grades/repositories/IGradeRepository';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import Notification from '@modules/notifications/infra/typeorm/schemas/Notification';
import ISendNotificationDTO from '@modules/notifications/dtos/ISendNotificationDTO';
import NotifyQueue from '@modules/notifications/infra/queues/NotifyQueue';
import IStudentRepository from '@modules/users/repositories/IStudentRepository';
import GradesSchemaDTO from '../dtos/GradesSchemaDTO';

import NotifyGradeService from './NotifyGradeService';

interface Request {
  token: string;
  student_id: string;
  havePush?: boolean;
}

interface PeriodResponse {
  ano_letivo: number;
  periodo_letivo: number;
}

@injectable()
class GradeCreateService {
  constructor(
    @inject('GradesRepository')
    private gradesRepository: IGradeRepository,

    @inject('NotificationRepository')
    private notificationsRepository: INotificationsRepository,

    @inject('StudentRepository') private studentsRepository: IStudentRepository,
  ) {}

  public async execute({
    token,
    student_id,
    havePush = true,
  }: Request): Promise<Notification[]> {
    const student = await this.studentsRepository.findByMatricula(student_id);

    if (!student) {
      throw new AppError('Não autorizado.', 401);
    }

    student.token = token;
    await this.studentsRepository.save(student);

    const periodResponse = await SuapApi.get(
      '/minhas-informacoes/meus-periodos-letivos/',
      {
        headers: { Authorization: `JWT ${student.token}` },
      },
    );

    const periods: PeriodResponse[] = periodResponse.data.reverse();

    let periodLoop = true;
    const updatedGrades: Array<GradesSchemaDTO[]> = [];
    const periodsResults = [];

    for (let i = 0; i < periods.length; i++) {
      try {
        if (periodLoop) {
          const response = await SuapApi.get(
            `/minhas-informacoes/boletim/${periods[i].ano_letivo}/${periods[i].periodo_letivo}`,
            {
              headers: { Authorization: `JWT ${student.token}` },
            },
          );

          periodsResults.push(
            `${periods[i].ano_letivo}/${periods[i].periodo_letivo}`,
          );
          updatedGrades.push(response.data);
          periodLoop = false;
        } else {
          periodsResults.push(null);
        }
      } catch (err) {
        periodsResults.push(null);
      }
    }

    const currentPeriod = periodsResults.filter(
      (periodResult: string | null) => {
        return periodResult !== null;
      },
    );

    if (!currentPeriod[0]) {
      throw new AppError('O estudante não possuí nenhum período válido');
    }

    const formattedGrades = updatedGrades[0].map(virtualClass => {
      return {
        disciplina: virtualClass.disciplina,
        situacao: virtualClass.situacao,
        nota_etapa_1: virtualClass.nota_etapa_1,
        nota_etapa_2: virtualClass.nota_etapa_2,
        nota_etapa_3: virtualClass.nota_etapa_3,
        nota_etapa_4: virtualClass.nota_etapa_4,
      };
    });

    const exists = await this.gradesRepository.checkExists(student_id);
    if (!exists) {
      await this.gradesRepository.create({
        matricula: student_id,
        periodo: currentPeriod[0],
        boletins: formattedGrades,
      });

      const notifications = this.notificationsRepository.findByMatricula(
        student_id,
      );

      return notifications;
    }

    const updatedData = {
      matricula: student_id,
      periodo: currentPeriod[0],
      boletins: formattedGrades,
    };

    const { periodo, boletins } = exists;

    if (periodo !== currentPeriod[0]) {
      await this.gradesRepository.update(updatedData);

      const notifications = this.notificationsRepository.findByMatricula(
        student_id,
      );

      return notifications;
    }

    const notifyGrades = new NotifyGradeService();

    const notifies = await notifyGrades.execute({
      oldGrade: boletins,
      newGrade: formattedGrades,
    });

    console.log(boletins);

    const notificationsSchema: ISendNotificationDTO[] = [];

    notifies.map(notify => {
      if (notify) {
        if (notify.updateType === 'nota' && notify.newScore) {
          const notification: ISendNotificationDTO = {
            student_id,
            title: `📝 Sua nota já está disponível!`,
            body: `Uma nota na disciplina de ${notify.disciplina} foi adicionada, toque para ver.`,
            matricula: student_id,
          };
          notificationsSchema.push(notification);
        }
        if (notify.updateType === 'nota' && !notify.newScore) {
          const notification: ISendNotificationDTO = {
            student_id,
            title: `📝 Uma nota foi alterada!`,
            body: `Uma nota na disciplina de ${notify.disciplina} foi alterada, toque para ver.`,
            matricula: student_id,
          };
          notificationsSchema.push(notification);
        }
        if (notify.updateType === 'situacao' && notify.updated === 'Aprovado') {
          const notification: ISendNotificationDTO = {
            student_id,
            title: `🚀 Você foi aprovado(a)!`,
            body: `Você decolou na disciplina: ${notify.disciplina} e conquistou a aprovação`,
            matricula: student_id,
          };
          notificationsSchema.push(notification);
        }
        if (
          notify.updateType === 'falta' &&
          notify.faltaDifference &&
          notify.faltaDifference > 0
        ) {
          const notification: ISendNotificationDTO = {
            student_id,
            title: `📊 Ausência registrada`,
            body: `${notify.faltaDifference} ${
              notify.faltaDifference && notify.faltaDifference > 1
                ? 'faltas foram registradas'
                : 'falta foi registrada'
            } na disciplina: ${notify.disciplina}`,
            matricula: student_id,
          };
          notificationsSchema.push(notification);
        }
      }
      return notificationsSchema;
    });

    if (notificationsSchema.length === 0) {
      const notifications = await this.notificationsRepository.findByMatricula(
        student_id,
      );

      return notifications;
    }

    if (!havePush) {
      await this.gradesRepository.update(updatedData);

      const notifications = await this.notificationsRepository.findByMatricula(
        student_id,
      );

      return notifications;
    }

    notificationsSchema.map(async notification => {
      await NotifyQueue.add({
        student_id: notification.student_id,
        title: notification.title,
        body: notification.body,
        tags: 'academico',
      });
    });

    await this.gradesRepository.update(updatedData);

    const notifications = await this.notificationsRepository.findByMatricula(
      student_id,
    );

    return notifications;
  }
}

export default GradeCreateService;
