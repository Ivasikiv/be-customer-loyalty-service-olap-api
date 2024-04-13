import * as process from 'process';
import { IConfig } from './interfaces';

export default (): IConfig => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    databaseName: process.env.DATABASE_NAME,
    databaseUrl: process.env.DATABASE_URL,
  },
  jwtSecret: process.env.JWT_SECRET,
});
