import type { Config } from 'drizzle-kit';
import { env } from './env';

export default {
  schema: './lib/drizzle/schema.ts',
  out: './drizzle',
  driver: 'pg',
  dbCredentials: {
    host: env.POSTGRES_HOST,
    port: 5432,
    user: 'default',
    password: env.POSTGRES_PASSWORD,
    database: env.POSTGRES_DATABASE,
    ssl: true
  }
} satisfies Config;
