import { Request, Response, NextFunction } from 'express';

import AppError from '@shared/errors/AppError';
import api from '@shared/infra/http/api';

export default async function ensureAuthenticate(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  // Validação do Token
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('Token não inserido', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const tokenresponse = await api.get('/minhas-informacoes/meus-dados/', {
      headers: { Authorization: `JWT ${token}` },
    });

    const { matricula } = tokenresponse.data;

    request.student = {
      id: matricula,
    };

    return next();
  } catch (err) {
    throw new AppError('Token inválido', 401);
  }
}
