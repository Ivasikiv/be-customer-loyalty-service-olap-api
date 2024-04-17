import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { DimTime } from 'src/@generated/prisma-nestjs-graphql/dim-time/dim-time.model';
import { DimTimeCreateInput } from 'src/@generated/prisma-nestjs-graphql/dim-time/dim-time-create.input';
import { DimTimeService } from './dim-time.service';

@Resolver(() => DimTime)
export class DimTimeResolver {
  constructor(private readonly timeService: DimTimeService) {}

  @Query(() => [DimTime], { name: 'DimTimes' })
  findAll(): Promise<DimTime[]> {
    return this.timeService.findAll();
  }

  @Query(() => DimTime, { name: 'DimTime', nullable: true })
  findOne(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<DimTime | null> {
    return this.timeService.findOne(id);
  }

  @Mutation(() => DimTime)
  createTime(
    @Args('createData') createData: DimTimeCreateInput,
  ): Promise<DimTime> {
    return this.timeService.create(createData);
  }
}
