import { Module } from '@nestjs/common';
import { DimLoyaltyUserService } from './dim-loyalty-user.service';
import { DimLoyaltyUserResolver } from './dim-loyalty-user.resolver';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [DimLoyaltyUserService, DimLoyaltyUserResolver, PrismaService],
  exports: [DimLoyaltyUserService],
})
export class DimLoyaltyUserModule {}
