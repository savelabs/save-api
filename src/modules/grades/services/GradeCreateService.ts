import { injectable, inject } from 'tsyringe';

import IGradeRepository from '@modules/grades/repositories/IGradeRepository';
import AppError from '@shared/errors/AppError';
import { SuapApi } from '@shared/infra/http/api';
import GradesSchemaDTO from '../dtos/GradesSchemaDTO';

import NotifyGradeService from './NotifyGradeService';

interface Request {
  token: string;
  student_id: string;
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
  ) {}

  public async execute({ token, student_id }: Request): Promise<void> {
    const periodResponse = await SuapApi.get(
      '/minhas-informacoes/meus-periodos-letivos/',
      {
        headers: { Authorization: `JWT ${token}` },
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
              headers: { Authorization: `JWT ${token}` },
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

      // retornar
    }

    const updatedData = {
      matricula: student_id,
      periodo: currentPeriod[0],
      boletins: formattedGrades,
    };

    const { periodo, boletins } = exists;

    if (periodo !== currentPeriod[0]) {
      await this.gradesRepository.update(updatedData);
      // retornar
    }

    const notifyGrades = new NotifyGradeService(this.gradesRepository);

    const notifies = await notifyGrades.execute({
      oldGrade: boletins,
      newGrade: formattedGrades,
    });

    if (notifies.length === 0) {
      console.log('teste');
    }

    await this.gradesRepository.update(updatedData);
    // retornar
  }
}

export default GradeCreateService;
