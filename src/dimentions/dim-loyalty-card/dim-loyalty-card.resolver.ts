import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { DimLoyaltyCard } from 'src/@generated/prisma-nestjs-graphql/dim-loyalty-card/dim-loyalty-card.model';
import { DimLoyaltyCardCreateInput } from 'src/@generated/prisma-nestjs-graphql/dim-loyalty-card/dim-loyalty-card-create.input';
import { DimLoyaltyCardService } from './dim-loyalty-card.service';

@Resolver(() => DimLoyaltyCard)
export class DimLoyaltyCardResolver {
  constructor(private readonly loyaltyCardService: DimLoyaltyCardService) {}

  @Query(() => [DimLoyaltyCard], { name: 'DimLoyaltyCards' })
  findAll(): Promise<DimLoyaltyCard[]> {
    return this.loyaltyCardService.findAll();
  }

  @Query(() => DimLoyaltyCard, { name: 'DimLoyaltyCard', nullable: true })
  findOne(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<DimLoyaltyCard | null> {
    return this.loyaltyCardService.findOne(id);
  }

  @Mutation(() => DimLoyaltyCard)
  createLoyaltyCard(
    @Args('createData') createData: DimLoyaltyCardCreateInput,
  ): Promise<DimLoyaltyCard> {
    return this.loyaltyCardService.create(createData);
  }
}
