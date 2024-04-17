import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { DimAssortmentSegment } from 'src/@generated/prisma-nestjs-graphql/dim-assortment-segment/dim-assortment-segment.model';
import { DimAssortmentSegmentCreateInput } from 'src/@generated/prisma-nestjs-graphql/dim-assortment-segment/dim-assortment-segment-create.input';
import { DimAssortmentSegmentService } from './dim-assortment-segment.service';

@Resolver(() => DimAssortmentSegment)
export class DimAssortmentSegmentResolver {
  constructor(
    private readonly assortmentSegmentService: DimAssortmentSegmentService,
  ) {}

  @Query(() => [DimAssortmentSegment], { name: 'DimAssortmentSegments' })
  findAll(): Promise<DimAssortmentSegment[]> {
    return this.assortmentSegmentService.findAll();
  }

  @Query(() => DimAssortmentSegment, {
    name: 'DimAssortmentSegment',
    nullable: true,
  })
  findOne(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<DimAssortmentSegment | null> {
    return this.assortmentSegmentService.findOne(id);
  }

  @Mutation(() => DimAssortmentSegment)
  createAssortmentSegment(
    @Args('createData') createData: DimAssortmentSegmentCreateInput,
  ): Promise<DimAssortmentSegment> {
    return this.assortmentSegmentService.create(createData);
  }
}
