import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { DimSeller } from 'src/@generated/prisma-nestjs-graphql/dim-seller/dim-seller.model';
import { DimSellerCreateInput } from 'src/@generated/prisma-nestjs-graphql/dim-seller/dim-seller-create.input';
import { DimSellerService } from './dim-seller.service';

@Resolver(() => DimSeller)
export class DimSellerResolver {
  constructor(private readonly sellerService: DimSellerService) {}

  @Query(() => [DimSeller], { name: 'DimSellers' })
  findAll(): Promise<DimSeller[]> {
    return this.sellerService.findAll();
  }

  @Query(() => DimSeller, { name: 'DimSeller', nullable: true })
  findOne(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<DimSeller | null> {
    return this.sellerService.findOne(id);
  }

  @Mutation(() => DimSeller)
  createSeller(
    @Args('createData') createData: DimSellerCreateInput,
  ): Promise<DimSeller> {
    return this.sellerService.create(createData);
  }
}
