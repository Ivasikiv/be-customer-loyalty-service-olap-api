import { Module } from '@nestjs/common';
import { DimDateService } from './dim-date.service';
import { DimDateResolver } from './dim-date.resolver';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [DimDateService, DimDateResolver, PrismaService],
  exports: [DimDateService],
})
export class DimDateModule {}
