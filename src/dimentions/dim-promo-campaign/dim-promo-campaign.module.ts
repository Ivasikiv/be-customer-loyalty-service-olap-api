import { Module } from '@nestjs/common';
import { DimPromoCampaignService } from './dim-promo-campaign.service';
import { DimPromoCampaignResolver } from './dim-promo-campaign.resolver';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [DimPromoCampaignService, DimPromoCampaignResolver, PrismaService],
  exports: [DimPromoCampaignService],
})
export class DimPromoCampaignModule {}
