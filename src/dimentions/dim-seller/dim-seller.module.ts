import { Module } from '@nestjs/common';
import { DimSellerService } from './dim-seller.service';
import { DimSellerResolver } from './dim-seller.resolver';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [DimSellerService, DimSellerResolver, PrismaService],
  exports: [DimSellerService],
})
export class DimSellerModule {}
