import { Module, Global } from '@nestjs/common';
import { Pool } from 'pg';

const dbProvider = {
  provide: 'DATABASE_POOL',
  useFactory: () => {
    const pool = new Pool({
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT, 10),
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
    });
    return pool;
  },
};

@Global()
@Module({
  providers: [dbProvider],
  exports: [dbProvider],
})
export class DatabaseModule {}
