import 'dotenv/config';
import 'reflect-metadata';
import '@shared/infra/typeorm';
import '@shared/container';

import { container } from 'tsyringe';
import NotifyQueue from '@modules/notifications/infra/queues/NotifyQueue';
import NotificationSendService from '@modules/notifications/services/NotificationSendService';
import ISendNotificationDTO from '@modules/notifications/dtos/ISendNotificationDTO';

import * as Sentry from '@sentry/node';

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

NotifyQueue.on('failed', err => {
  console.log(err);
  Sentry.captureException(err);
});
