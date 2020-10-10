import { Router } from 'express';
import api from '../services/api';
import upload from '../config/upload';
import AppError from '../errors/AppError';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import CreateStudentService from '../services/CreateStudentService';
import UpdateAvatarStudentService from '../services/UpdateAvatarStudentService';
import DeleteAvatarStudentService from '../services/DeleteAvatarStudentService';
import UpdateProfileStudentService from '../services/UpdateProfileStudentService';
import ListStudentService from '../services/ListStudentService';
import ListAdminStudentService from '../services/ListAdminStudentService';

const studentsRouter = Router();

interface Dados {
  token: string;
  matricula: string;
}

studentsRouter.get(
  '/profile',
  ensureAuthenticated,
  async (request, response) => {
    const student_id = request.student.id;

    const listProfile = new ListStudentService();

    const listprofile = await listProfile.execute({
      student_id,
    });

    return response.json(listprofile);
  },
);

studentsRouter.get(
  '/profiles',
  ensureAuthenticated,
  async (request, response) => {
    const student_id = request.student.id;

    const listAdmin = new ListAdminStudentService();

    const listadmin = await listAdmin.execute({
      student_id,
    });

    return response.json(listadmin);
  },
);

studentsRouter.post('/', async (request, response) => {
  const { matricula, password } = request.body;

  await api
    .post('/autenticacao/token/', {
      username: matricula,
      password,
    })
    .catch(err => {
      throw new AppError(`Credenciais inválidas, ${err.message}`, 401);
    })
    .then(async tokenresponse => {
      const { token } = tokenresponse.data;

      const createStudent = new CreateStudentService();

      const student = await createStudent.execute({
        paramMatricula: matricula,
        token,
      });
      return response.json({ student, token });
    });
});

studentsRouter.put(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    const updateAvatarProfile = new UpdateAvatarStudentService();

    const update = await updateAvatarProfile.execute({
      student_id: request.student.id,
      blobName: request.file.blobName,
    });

    return response.json(update);
  },
);

studentsRouter.delete(
  '/avatar',
  ensureAuthenticated,
  async (request, response) => {
    const deleteAvatarProfile = new DeleteAvatarStudentService();

    const delete = await deleteAvatarProfile.execute({
      student_id: request.student.id,
    })
  },
);

studentsRouter.put(
  '/profile',
  ensureAuthenticated,
  async (request, response) => {
    const { email, turma } = request.body;

    const updateProfile = new UpdateProfileStudentService();

    const profile = await updateProfile.execute({
      student_id: request.student.id,
      email,
      turma,
    });

    return response.json(profile);
  },
);

export default studentsRouter;
