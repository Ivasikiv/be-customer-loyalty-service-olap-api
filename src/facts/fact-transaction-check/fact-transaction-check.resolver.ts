import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { FactTransactionCheck } from 'src/@generated/prisma-nestjs-graphql/fact-transaction-check/fact-transaction-check.model';
import { FactTransactionCheckCreateInput } from 'src/@generated/prisma-nestjs-graphql/fact-transaction-check/fact-transaction-check-create.input';
import { FactTransactionCheckService } from './fact-transaction-check.service';
import { CreateFactTransactionCheckInput } from './dto/create-fact-transaction-check.input';

@Resolver(() => FactTransactionCheck)
export class FactTransactionCheckResolver {
  constructor(
    private readonly factTransactionCheckService: FactTransactionCheckService,
  ) {}

  @Mutation(() => FactTransactionCheck)
  createFactTransactionCheck(
    @Args('data') data: CreateFactTransactionCheckInput,
  ) {
    return this.factTransactionCheckService.create(data);
  }

  @Query(() => [FactTransactionCheck])
  findAllFactTransactionCheck() {
    return this.factTransactionCheckService.findAll();
  }

  @Query(() => FactTransactionCheck)
  findOneFactTransactionCheck(@Args('id') id: number) {
    return this.factTransactionCheckService.findOne(id);
  }

  //   @Mutation(() => FactTransactionCheck)
  //   updateFactTransactionCheck(
  //     @Args('id') id: number,
  //     @Args('data') data: FactTransactionCheckCreateInput,
  //   ) {
  //     return this.factTransactionCheckService.update(id, data);
  //   }

  @Mutation(() => FactTransactionCheck)
  removeFactTransactionCheck(@Args('id') id: number) {
    return this.factTransactionCheckService.remove(id);
  }
}
