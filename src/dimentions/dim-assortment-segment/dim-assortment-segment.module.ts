import { Module } from '@nestjs/common';
import { DimAssortmentSegmentService } from './dim-assortment-segment.service';
import { DimAssortmentSegmentResolver } from './dim-assortment-segment.resolver';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [
    DimAssortmentSegmentService,
    DimAssortmentSegmentResolver,
    PrismaService,
  ],
  exports: [DimAssortmentSegmentService],
})
export class DimAssortmentSegmentModule {}
