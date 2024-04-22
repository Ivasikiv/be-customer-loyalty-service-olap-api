import { InputType, Field, Int, Float } from '@nestjs/graphql';

@InputType()
export class CreateFactTransactionItemInput {
  @Field(() => Int)
  TransactionItemID: number;

  @Field(() => Int)
  DateID: number;

  @Field(() => Int)
  TimeID: number;

  @Field(() => Int)
  AssortmentSegmentID: number;

  @Field(() => Int, { nullable: true })
  PromoCampaignID?: number;

  @Field(() => Int)
  SellerID: number;

  @Field(() => Int)
  LoyaltyUserID: number;

  @Field(() => Int)
  LocationID: number;

  @Field({ nullable: true })
  ItemName?: string;

  @Field(() => Int, { nullable: true })
  QuantitySold?: number;

  @Field(() => Float, { nullable: true })
  Price: number;

  @Field(() => Int, { nullable: true })
  TotalPoints?: number;
}
