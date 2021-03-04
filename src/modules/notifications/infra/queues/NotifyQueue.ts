import Queue from 'bull';

const NotifyQueue = new Queue('notify', {
  redis: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
    password: process.env.REDIS_PASS || undefined,
  },
});

export default NotifyQueue;
