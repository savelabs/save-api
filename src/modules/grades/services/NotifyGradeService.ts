import { injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import GradesSchemaDTO from '../dtos/GradesSchemaDTO';

interface UpdateResponse {
  disciplina: string;
  updateType: 'situacao' | 'nota' | 'falta';
  updated: number | string | GradesSchemaDTO | null;
  faltaDifference?: number;
  newScore?: boolean;
}

interface Request {
  oldGrade: GradesSchemaDTO[];
  newGrade: GradesSchemaDTO[];
}

@injectable()
class NotifyGradeService {
  public async execute({
    oldGrade,
    newGrade,
  }: Request): Promise<(UpdateResponse | null)[]> {
    if (oldGrade === newGrade) {
      throw new AppError('Nenhuma notificação disponível!', 404);
    }

    const notifyGrades = oldGrade.map((grade, index) => {
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
          newScore: grade.nota_etapa_1.nota === null,
        };
        return updateResponse;
      }
      if (grade.nota_etapa_1.faltas !== newGrade[index].nota_etapa_1.faltas) {
        const updateResponse: UpdateResponse = {
          disciplina: newGrade[index].disciplina,
          updateType: 'falta',
          faltaDifference:
            newGrade[index].nota_etapa_1.faltas - grade.nota_etapa_1.faltas,
          updated: newGrade[index].nota_etapa_1.faltas,
        };
        return updateResponse;
      }
      if (grade.nota_etapa_2.nota !== newGrade[index].nota_etapa_2.nota) {
        const updateResponse: UpdateResponse = {
          disciplina: newGrade[index].disciplina,
          updateType: 'nota',
          updated: newGrade[index].nota_etapa_2.nota,
          newScore: grade.nota_etapa_2.nota === null,
        };
        return updateResponse;
      }
      if (grade.nota_etapa_2.faltas !== newGrade[index].nota_etapa_2.faltas) {
        const updateResponse: UpdateResponse = {
          disciplina: newGrade[index].disciplina,
          updateType: 'falta',
          faltaDifference:
            newGrade[index].nota_etapa_2.faltas - grade.nota_etapa_2.faltas,
          updated: newGrade[index].nota_etapa_2.faltas,
        };
        return updateResponse;
      }
      if (grade.nota_etapa_3.nota !== newGrade[index].nota_etapa_3.nota) {
        const updateResponse: UpdateResponse = {
          disciplina: newGrade[index].disciplina,
          updateType: 'nota',
          updated: newGrade[index].nota_etapa_3.nota,
          newScore: grade.nota_etapa_3.nota === null,
        };
        return updateResponse;
      }
      if (grade.nota_etapa_3.faltas !== newGrade[index].nota_etapa_3.faltas) {
        const updateResponse: UpdateResponse = {
          disciplina: newGrade[index].disciplina,
          updateType: 'falta',
          faltaDifference:
            newGrade[index].nota_etapa_3.faltas - grade.nota_etapa_3.faltas,
          updated: newGrade[index].nota_etapa_3.faltas,
        };
        return updateResponse;
      }
      if (grade.nota_etapa_4.nota !== newGrade[index].nota_etapa_4.nota) {
        const updateResponse: UpdateResponse = {
          disciplina: newGrade[index].disciplina,
          updateType: 'nota',
          updated: newGrade[index].nota_etapa_4.nota,
          newScore: grade.nota_etapa_4.nota === null,
        };
        return updateResponse;
      }
      if (grade.nota_etapa_4.faltas !== newGrade[index].nota_etapa_4.faltas) {
        const updateResponse: UpdateResponse = {
          disciplina: newGrade[index].disciplina,
          updateType: 'falta',
          faltaDifference:
            newGrade[index].nota_etapa_4.faltas - grade.nota_etapa_4.faltas,
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
