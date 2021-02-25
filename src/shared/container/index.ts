import { container } from 'tsyringe';

import IGradeRepository from '@modules/grades/repositories/IGradeRepository';
import GradeRepository from '@modules/grades/infra/typeorm/repositories/GradeRepository';

import IStudentRepository from '@modules/users/repositories/IStudentRepository';
import StudentRepository from '@modules/users/infra/typeorm/repositories/StudentRepository';

import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import NotificationsRepository from '@modules/notifications/infra/typeorm/repositories/NotificationsRepository';

container.registerSingleton<IStudentRepository>(
  'StudentRepository',
  StudentRepository,
);

container.registerSingleton<IGradeRepository>(
  'GradesRepository',
  GradeRepository,
);

container.registerSingleton<INotificationsRepository>(
  'NotificationRepository',
  NotificationsRepository,
);
