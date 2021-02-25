import { injectable, inject } from 'tsyringe';

import IGradeRepository from '@modules/grades/repositories/IGradeRepository';
import AppError from '@shared/errors/AppError';
import GradesSchemaDTO from '../dtos/GradesSchemaDTO';

interface UpdateResponse {
  disciplina: string;
  updateType: 'situacao' | 'nota' | 'falta' | 'disciplina';
  updated: number | string | GradesSchemaDTO | null;
  faltaDifference?: number;
}

interface Request {
  oldGrade: GradesSchemaDTO[];
  newGrade: GradesSchemaDTO[];
}

@injectable()
class NotifyGradeService {
  constructor(
    @inject('GradesRepository')
    private gradesRepository: IGradeRepository,
  ) {}

  public async execute({
    oldGrade,
    newGrade,
  }: Request): Promise<(UpdateResponse | null)[]> {
    if (oldGrade === newGrade) {
      throw new AppError('Nenhuma notificação disponível!', 404);
    }

    const notifyGrades = oldGrade.map((grade, index) => {
      if (grade.disciplina !== newGrade[index].disciplina) {
        const updateResponse: UpdateResponse = {
          disciplina: newGrade[index].disciplina,
          updateType: 'disciplina',
          updated: newGrade[index],
        };
        return updateResponse;
      }
      if (grade.situacao !== newGrade[index].situacao) {
        const updateResponse: UpdateResponse = {
          disciplina: newGrade[index].disciplina,
          updateType: 'situacao',
          updated: newGrade[index].situacao,
        };
        return updateResponse;
      }
      if (grade.nota_etapa_1.nota !== newGrade[index].nota_etapa_1.nota) {
        const updateResponse: UpdateResponse = {
          disciplina: newGrade[index].disciplina,
          updateType: 'nota',
          updated: newGrade[index].nota_etapa_1.nota,
        };
        return updateResponse;
      }
      if (grade.nota_etapa_1.faltas !== newGrade[index].nota_etapa_1.faltas) {
        const updateResponse: UpdateResponse = {
          disciplina: newGrade[index].disciplina,
          updateType: 'falta',
          faltaDifference:
            grade.nota_etapa_1.faltas - newGrade[index].nota_etapa_1.faltas,
          updated: newGrade[index].nota_etapa_1.faltas,
        };
        return updateResponse;
      }
      if (grade.nota_etapa_2.nota !== newGrade[index].nota_etapa_2.nota) {
        const updateResponse: UpdateResponse = {
          disciplina: newGrade[index].disciplina,
          updateType: 'nota',
          updated: newGrade[index].nota_etapa_2.nota,
        };
        return updateResponse;
      }
      if (grade.nota_etapa_2.faltas !== newGrade[index].nota_etapa_2.faltas) {
        const updateResponse: UpdateResponse = {
          disciplina: newGrade[index].disciplina,
          updateType: 'falta',
          faltaDifference:
            grade.nota_etapa_2.faltas - newGrade[index].nota_etapa_2.faltas,
          updated: newGrade[index].nota_etapa_2.faltas,
        };
        return updateResponse;
      }
      if (grade.nota_etapa_3.nota !== newGrade[index].nota_etapa_3.nota) {
        const updateResponse: UpdateResponse = {
          disciplina: newGrade[index].disciplina,
          updateType: 'nota',
          updated: newGrade[index].nota_etapa_3.nota,
        };
        return updateResponse;
      }
      if (grade.nota_etapa_3.faltas !== newGrade[index].nota_etapa_3.faltas) {
        const updateResponse: UpdateResponse = {
          disciplina: newGrade[index].disciplina,
          updateType: 'falta',
          faltaDifference:
            grade.nota_etapa_3.faltas - newGrade[index].nota_etapa_3.faltas,
          updated: newGrade[index].nota_etapa_3.faltas,
        };
        return updateResponse;
      }
      if (grade.nota_etapa_4.nota !== newGrade[index].nota_etapa_4.nota) {
        const updateResponse: UpdateResponse = {
          disciplina: newGrade[index].disciplina,
          updateType: 'nota',
          updated: newGrade[index].nota_etapa_4.nota,
        };
        return updateResponse;
      }
      if (grade.nota_etapa_4.faltas !== newGrade[index].nota_etapa_4.faltas) {
        const updateResponse: UpdateResponse = {
          disciplina: newGrade[index].disciplina,
          updateType: 'falta',
          faltaDifference:
            grade.nota_etapa_4.faltas - newGrade[index].nota_etapa_4.faltas,
          updated: newGrade[index].nota_etapa_4.faltas,
        };
        return updateResponse;
      }

      return null;
    });

    const notifies = notifyGrades.filter(notify => notify !== null);

    return notifies;
  }
}

export default NotifyGradeService;
