import { Module } from '@nestjs/common';
import { DimTimeService } from './dim-time.service';
import { DimTimeResolver } from './dim-time.resolver';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [DimTimeService, DimTimeResolver, PrismaService],
  exports: [DimTimeService],
})
export class DimTimeModule {}
