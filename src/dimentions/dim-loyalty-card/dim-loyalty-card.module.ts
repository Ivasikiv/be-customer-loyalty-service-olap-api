import { Module } from '@nestjs/common';
import { DimLoyaltyCardService } from './dim-loyalty-card.service';
import { DimLoyaltyCardResolver } from './dim-loyalty-card.resolver';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [DimLoyaltyCardService, DimLoyaltyCardResolver, PrismaService],
  exports: [DimLoyaltyCardService],
})
export class DimLoyaltyCardModule {}
