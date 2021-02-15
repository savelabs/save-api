import { container } from 'tsyringe';

import IStudentRepository from '@modules/users/repositories/IStudentRepository';
import StudentRepository from '@modules/users/infra/typeorm/repositories/StudentRepository';

container.registerSingleton<IStudentRepository>(
  'StudentRepository',
  StudentRepository,
);
