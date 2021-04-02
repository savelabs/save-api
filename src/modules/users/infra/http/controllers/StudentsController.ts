import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import api from '@shared/infra/http/api';

import CreateStudentService from '@modules/users/services/CreateStudentService';
import UpdateProfileStudentService from '@modules/users/services/UpdateProfileStudentService';
import ListAdminStudentService from '@modules/users/services/ListAdminStudentService';
import ListStudentService from '@modules/users/services/ListStudentService';

interface MatriculaResponse {
  data: {
    matricula: string;
  };
}

export default class NotificationsController {
  async create(request: Request, response: Response): Promise<Response> {
    const BearerToken = request.headers.authorization;

    if (!BearerToken) {
      throw new AppError('Token inválido', 401);
    }

    const [, token] = BearerToken.split(' ');

    try {
      const matriculaResponse: MatriculaResponse = await api.get(
        '/minhas-informacoes/meus-dados/',
        {
          headers: { Authorization: `JWT ${token}` },
        },
      );

      const { matricula } = matriculaResponse.data;

      const createStudent = container.resolve(CreateStudentService);

      const student = await createStudent.execute({
        paramMatricula: matricula,
        token,
      });

      return response.json({ student });
    } catch (err) {
      throw new AppError('Token inválido', 401);
    }
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { email, turma } = request.body;

    const updateProfile = container.resolve(UpdateProfileStudentService);

    const profile = await updateProfile.execute({
      student_id: request.student.id,
      email,
      turma,
    });

    return response.json(profile);
  }

  async showAdmin(request: Request, response: Response): Promise<Response> {
    const student_id = request.student.id;

    const listAdmin = container.resolve(ListAdminStudentService);

    const listadmin = await listAdmin.execute({
      student_id,
    });

    return response.json(listadmin);
  }

  async show(request: Request, response: Response): Promise<Response> {
    const student_id = request.student.id;

    const listProfile = container.resolve(ListStudentService);

    const listprofile = await listProfile.execute({
      student_id,
    });

    return response.json(listprofile);
  }
}
