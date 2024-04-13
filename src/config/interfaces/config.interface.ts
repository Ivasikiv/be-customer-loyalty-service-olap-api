interface IDataBase {
  host: string;
  port: number;
  user: string;
  password: string;
  databaseName: string;
  databaseUrl: string;
}

export interface IConfig {
  port: number;
  database: IDataBase;
  jwtSecret: string;
}
