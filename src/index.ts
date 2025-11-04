import Fastify from 'fastify';
import cors from '@fastify/cors';
import { env } from './lib/env.js';
import { healthRoutes } from './routes/health.js';

const fastify = Fastify({
  logger: {
    level: env.nodeEnv === 'development' ? 'info' : 'warn',
  },
});

// Register CORS
await fastify.register(cors);

// Register routes
await fastify.register(healthRoutes);

// Start server
try {
  await fastify.listen({ port: env.port, host: env.host });
  console.log(`Servidor escutando em ${env.host}:${env.port}`);
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
