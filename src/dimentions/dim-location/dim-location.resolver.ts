import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { DimLocation } from 'src/@generated/prisma-nestjs-graphql/dim-location/dim-location.model';
import { DimLocationCreateInput } from 'src/@generated/prisma-nestjs-graphql/dim-location/dim-location-create.input';
import { DimLocationService } from './dim-location.service';

@Resolver(() => DimLocation)
export class DimLocationResolver {
  constructor(private readonly locationService: DimLocationService) {}

  @Query(() => [DimLocation], { name: 'DimLocations' })
  findAll(): Promise<DimLocation[]> {
    return this.locationService.findAll();
  }

  @Query(() => DimLocation, { name: 'DimLocation', nullable: true })
  findOne(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<DimLocation | null> {
    return this.locationService.findOne(id);
  }

  @Mutation(() => DimLocation)
  createLocation(
    @Args('createData') createData: DimLocationCreateInput,
  ): Promise<DimLocation> {
    return this.locationService.create(createData);
  }
}
