import { InputType, Field, Int, Float } from '@nestjs/graphql';

@InputType()
export class CreateFactTransactionCheckInput {
  @Field(() => Int)
  TransactionCheckID: number;

  @Field(() => Int)
  DateID: number;

  @Field(() => Int)
  TimeID: number;

  @Field(() => Int)
  LoyaltyCardID: number;

  @Field(() => Int)
  SellerID: number;

  @Field(() => Int)
  LoyaltyUserID: number;

  @Field(() => Int)
  LocationID: number;

  @Field()
  PaymentMethod: string;

  @Field(() => Int, { nullable: true })
  TimeFromLastCardUsage?: number;

  @Field(() => Int, { nullable: true })
  PointsAccumulated?: number;

  @Field(() => Int, { nullable: true })
  PointsWithdraw?: number;

  @Field(() => Float)
  TotalPrice: number;
}
