import Queue from 'bull';

const NotifyQueue = new Queue('notify', {
  redis: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
    password: process.env.REDIS_PASS || undefined,
  },
});

export const TokenQueue = new Queue('tokenqueue', {
  redis: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
    password: process.env.REDIS_PASS || undefined,
  },
  limiter: {
    max: 3,
    duration: 60000, // 1 minuto
  },
});

export default NotifyQueue;
