import { Injectable } from '@nestjs/common';
import { ETLProcess } from './utills/etl-process';
import * as cron from 'node-cron';

@Injectable()
export class ETLService {
  constructor(private readonly etlProcess: ETLProcess) {}

  async runFullETL(): Promise<void> {
    console.log('Running full ETL process...');
    await this.etlProcess.fetchOrderRecords();
    console.log('ETL process completed');
  }

  async runETLByDateRange(startDate: string, endDate: string): Promise<void> {
    console.log(
      `Running ETL process for date range ${startDate} to ${endDate}...`,
    );
    await this.etlProcess.fetchOrderRecords(startDate, endDate);
    console.log('ETL process completed');
  }

  async clearDataByDateRange(
    startDate: string,
    endDate: string,
  ): Promise<void> {
    // Очищення даних з OLAP за визначений період часу
    console.log(
      `Clearing data from OLAP for date range ${startDate} to ${endDate}...`,
    );
    // Операції з базою даних
  }

  startDailyETLCronJob() {
    cron.schedule(
      '30 4 * * *',
      async () => {
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - 1);
        startDate.setHours(0, 0, 0, 0);

        const endDate = new Date();
        endDate.setDate(endDate.getDate() - 1);
        endDate.setHours(23, 59, 59, 999);

        await this.runETLByDateRange(
          startDate.toISOString(),
          endDate.toISOString(),
        );
      },
      {
        timezone: 'Europe/Kiev',
      },
    );
  }
}
