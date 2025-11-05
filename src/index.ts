import Fastify from 'fastify';
import cors from '@fastify/cors';
import { env } from './lib/env.js';
import { healthRoutes } from './routes/health.js';

import pkg from 'pg';
import Redis from 'ioredis';

const { Client } = pkg;

const fastify = Fastify({
  logger: {
    level: env.nodeEnv === 'development' ? 'info' : 'warn',
  },
});

// Register CORS
await fastify.register(cors);

// Register routes
await fastify.register(healthRoutes);

// === TESTE DE CONEXÕES ===
async function testConnections() {
  console.log('🔍 Testando conexões...');

  // PostgreSQL
  const db = new Client({
    host: env.database.host,
    port: env.database.port,
    database: env.database.database,
    user: env.database.user,
    password: env.database.password,
    ssl: false, // VPS interna, então não precisa SSL
  });

  try {
    await db.connect();
    const res = await db.query('SELECT NOW()');
    console.log('✅ PostgreSQL conectado com sucesso:', res.rows[0]);
    await db.end();
  } catch (err) {
    console.error('❌ Erro ao conectar ao PostgreSQL:', err.message);
  }

  // Redis
  const redis = new Redis({
    host: env.redis.host,
    port: env.redis.port,
    password: env.redis.password,
  });

  try {
    const pong = await redis.ping();
    console.log('✅ Redis conectado com sucesso:', pong);
    await redis.quit();
  } catch (err) {
    console.error('❌ Erro ao conectar ao Redis:', err.message);
  }

  console.log('🔎 Teste de conexões finalizado.\n');
}

await testConnections();

// Start server
try {
  await fastify.listen({ port: env.port, host: env.host });
  console.log(`Servidor escutando em ${env.host}:${env.port}`);
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
