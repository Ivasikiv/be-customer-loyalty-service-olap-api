import { Module } from '@nestjs/common';
import { ETLResolver } from './etl.resolver';
import { ETLService } from './etl.service';
import { ETLProcessService } from './utills/etl-extract.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [ETLResolver, ETLService, ETLProcessService, PrismaService],
})
export class ETLModule {}
