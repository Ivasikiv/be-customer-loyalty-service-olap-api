import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { FactTransactionItem } from 'src/@generated/prisma-nestjs-graphql/fact-transaction-item/fact-transaction-item.model';
import { FactTransactionItemCreateInput } from 'src/@generated/prisma-nestjs-graphql/fact-transaction-item/fact-transaction-item-create.input';
import { FactTransactionItemService } from './fact-transaction-item.service';
import { CreateFactTransactionItemInput } from './dto/create-fact-transaction-item.input';

@Resolver(() => FactTransactionItem)
export class FactTransactionItemResolver {
  constructor(
    private readonly factTransactionItemService: FactTransactionItemService,
  ) {}

  @Mutation(() => FactTransactionItem)
  createFactTransactionItem(
    @Args('data') data: CreateFactTransactionItemInput,
  ) {
    return this.factTransactionItemService.create(data);
  }

  @Query(() => [FactTransactionItem])
  findAllFactTransactionItem() {
    return this.factTransactionItemService.findAll();
  }

  @Query(() => FactTransactionItem)
  findOneFactTransactionItem(@Args('id') id: number) {
    return this.factTransactionItemService.findOne(id);
  }

  //   @Mutation(() => FactTransactionItem)
  //   updateFactTransactionItem(
  //     @Args('id') id: number,
  //     @Args('data') data: FactTransactionItemCreateInput,
  //   ) {
  //     return this.factTransactionItemService.update(id, data);
  //   }

  @Mutation(() => FactTransactionItem)
  removeFactTransactionItem(@Args('id') id: number) {
    return this.factTransactionItemService.remove(id);
  }
}
