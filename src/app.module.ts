import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { join } from 'node:path';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { DimLoyaltyUserModule } from './dimentions/dim-loyalty-user/dim-loyalty-user.module';
import { DimAssortmentSegmentModule } from './dimentions/dim-assortment-segment/dim-assortment-segment.module';
import { DimDateModule } from './dimentions/dim-date/dim-date.module';
import { DimLocationModule } from './dimentions/dim-location/dim-location.module';
import { DimLoyaltyCardModule } from './dimentions/dim-loyalty-card/dim-loyalty-card.module';
import { DimPromoCampaignModule } from './dimentions/dim-promo-campaign/dim-promo-campaign.module';
import { DimSellerModule } from './dimentions/dim-seller/dim-seller.module';
import { DimTimeModule } from './dimentions/dim-time/dim-time.module';
import { FactTransactionCheckModule } from './facts/fact-transaction-check/fact-transaction-check.module';
import { FactTransactionItemModule } from './facts/fact-transaction-item/fact-transaction-item.module';
import { ETLModule } from './ETL/etl.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      introspection: true,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    PrismaModule,
    DimAssortmentSegmentModule,
    DimDateModule,
    DimLocationModule,
    DimLoyaltyCardModule,
    DimLoyaltyUserModule,
    DimPromoCampaignModule,
    DimSellerModule,
    DimTimeModule,
    FactTransactionCheckModule,
    FactTransactionItemModule,
    ETLModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // TODO - don't forget to uncomment this
    // {
    //   provide: APP_GUARD,
    //   useClass: JwtAuthGuard,
    // },
  ],
})
export class AppModule {}
