import { Module } from '@nestjs/common';
import { ETLResolver } from './etl.resolver';
import { ETLService } from './etl.service';
import { ETLProcess } from './utills/etl-process';

@Module({
  providers: [ETLResolver, ETLService, ETLProcess],
})
export class ETLModule {}
