import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { DimLoyaltyUser } from 'src/@generated/prisma-nestjs-graphql/dim-loyalty-user/dim-loyalty-user.model';
import { DimLoyaltyUserCreateInput } from 'src/@generated/prisma-nestjs-graphql/dim-loyalty-user/dim-loyalty-user-create.input';
import { DimLoyaltyUserService } from './dim-loyalty-user.service';

@Resolver(() => DimLoyaltyUser)
export class DimLoyaltyUserResolver {
  constructor(private readonly usersService: DimLoyaltyUserService) {}

  @Query(() => [DimLoyaltyUser], { name: 'DimLoyaltyUsers' })
  findAll(): Promise<DimLoyaltyUser[]> {
    return this.usersService.findAll();
  }

  @Query(() => DimLoyaltyUser, { name: 'DimLoyaltyUser', nullable: true })
  findOne(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<DimLoyaltyUser | null> {
    return this.usersService.findOne(id);
  }

  @Mutation(() => DimLoyaltyUser)
  createUser(
    @Args('createData') createData: DimLoyaltyUserCreateInput,
  ): Promise<DimLoyaltyUser> {
    console.log(createData);
    return this.usersService.create(createData);
  }
}
