import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { DimDate } from 'src/@generated/prisma-nestjs-graphql/dim-date/dim-date.model';
import { DimDateCreateInput } from 'src/@generated/prisma-nestjs-graphql/dim-date/dim-date-create.input';
import { DimDateService } from './dim-date.service';

@Resolver(() => DimDate)
export class DimDateResolver {
  constructor(private readonly dimDateService: DimDateService) {}

  @Query(() => [DimDate], { name: 'DimDates' })
  findAll(): Promise<DimDate[]> {
    return this.dimDateService.findAll();
  }

  @Query(() => DimDate, { name: 'DimDate', nullable: true })
  findOne(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<DimDate | null> {
    return this.dimDateService.findOne(id);
  }

  @Mutation(() => DimDate)
  createDimDate(
    @Args('createData') createData: DimDateCreateInput,
  ): Promise<DimDate> {
    return this.dimDateService.create(createData);
  }
}
