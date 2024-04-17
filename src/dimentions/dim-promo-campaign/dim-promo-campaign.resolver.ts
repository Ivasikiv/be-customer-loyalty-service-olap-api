import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { DimPromoCampaign } from 'src/@generated/prisma-nestjs-graphql/dim-promo-campaign/dim-promo-campaign.model';
import { DimPromoCampaignCreateInput } from 'src/@generated/prisma-nestjs-graphql/dim-promo-campaign/dim-promo-campaign-create.input';
import { DimPromoCampaignService } from './dim-promo-campaign.service';

@Resolver(() => DimPromoCampaign)
export class DimPromoCampaignResolver {
  constructor(private readonly promoCampaignService: DimPromoCampaignService) {}

  @Query(() => [DimPromoCampaign], { name: 'DimPromoCampaigns' })
  findAll(): Promise<DimPromoCampaign[]> {
    return this.promoCampaignService.findAll();
  }

  @Query(() => DimPromoCampaign, { name: 'DimPromoCampaign', nullable: true })
  findOne(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<DimPromoCampaign | null> {
    return this.promoCampaignService.findOne(id);
  }

  @Mutation(() => DimPromoCampaign)
  createPromoCampaign(
    @Args('createData') createData: DimPromoCampaignCreateInput,
  ): Promise<DimPromoCampaign> {
    return this.promoCampaignService.create(createData);
  }
}
