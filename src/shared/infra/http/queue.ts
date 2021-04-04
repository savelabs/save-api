import 'dotenv/config';
import 'reflect-metadata';
import '@shared/infra/typeorm';
import '@shared/container';

import { container } from 'tsyringe';
import NotifyQueue, {
  TokenQueue,
} from '@modules/notifications/infra/queues/NotifyQueue';
import NotificationSendService from '@modules/notifications/services/NotificationSendService';
import ISendNotificationDTO from '@modules/notifications/dtos/ISendNotificationDTO';

import * as Sentry from '@sentry/node';
import GradeCreateService from '@modules/grades/services/GradeCreateService';
import AppError from '@shared/errors/AppError';
import SuapApi from './api';

console.log('Queue started');

Sentry.init({
  dsn: process.env.SENTRY_DSN,
});

NotifyQueue.process(async job => {
  const { student_id, title, body, tags } = job.data as ISendNotificationDTO;

  const sendNotification = container.resolve(NotificationSendService);
  await sendNotification.execute({
    student_id,
    title,
    body,
    tags,
  });
});

TokenQueue.process(async job => {
  const { token, student_id } = job.data;

  try {
    const refresh = await SuapApi.post('/autenticacao/token/refresh/', {
      token,
    });

    const newToken = refresh.data.token;

    const checkNotification = container.resolve(GradeCreateService);
    await checkNotification.execute({
      token: newToken,
      student_id,
      havePush: true,
    });
  } catch {
    throw new AppError('Token expirado ou inválido');
  }
});

NotifyQueue.on('failed', err => {
  console.log(err);
  Sentry.captureException(err);
});

TokenQueue.on('failed', err => {
  console.log(err);
  Sentry.captureException(err);
});
