import { Module } from '@nestjs/common';
import { DimLocationService } from './dim-location.service';
import { DimLocationResolver } from './dim-location.resolver';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [DimLocationService, DimLocationResolver, PrismaService],
  exports: [DimLocationService],
})
export class DimLocationModule {}
