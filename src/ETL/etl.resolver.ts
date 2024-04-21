import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { ETLService } from './etl.service';

@Resolver()
export class ETLResolver {
  constructor(private readonly etlService: ETLService) {}

  @Mutation(() => String)
  async runFullETL(): Promise<string> {
    await this.etlService.runFullETL();
    return 'Full ETL process completed';
  }

  @Mutation(() => String)
  async runETLByDateRange(
    @Args('startDate') startDate: string,
    @Args('endDate') endDate: string,
  ): Promise<string> {
    await this.etlService.runETLByDateRange(startDate, endDate);
    return `ETL process completed for the date range ${startDate} to ${endDate}`;
  }

  @Mutation(() => String)
  async clearDataByDateRange(
    @Args('startDate') startDate: string,
    @Args('endDate') endDate: string,
  ): Promise<string> {
    await this.etlService.clearDataByDateRange(startDate, endDate);
    return `Data cleared from OLAP for the date range ${startDate} to ${endDate}`;
  }
}
