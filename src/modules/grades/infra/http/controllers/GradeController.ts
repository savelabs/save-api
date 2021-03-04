import { Request, Response } from 'express';
import { container } from 'tsyringe';
import AppError from '@shared/errors/AppError';

import GradeCreateService from '@modules/grades/services/GradeCreateService';

export default class GradeController {
  async create(request: Request, response: Response): Promise<Response> {
    const BearerToken = request.headers.authorization;
    const student_id = request.student.id;
    const havePush = request.params;

    if (!BearerToken) {
      throw new AppError('Token inválido', 401);
    }

    const [, token] = BearerToken.split(' ');

    const createService = container.resolve(GradeCreateService);

    const responseCreateService = await createService.execute({
      token,
      student_id,
      havePush: Boolean(havePush),
    });

    return response.json(responseCreateService);
  }
}
