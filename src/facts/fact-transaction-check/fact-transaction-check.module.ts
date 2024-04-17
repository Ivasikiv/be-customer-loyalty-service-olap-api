import { Module } from '@nestjs/common';
import { FactTransactionCheckService } from './fact-transaction-check.service';
import { FactTransactionCheckResolver } from './fact-transaction-check.resolver';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [
    FactTransactionCheckService,
    FactTransactionCheckResolver,
    PrismaService,
  ],
  exports: [FactTransactionCheckService],
})
export class FactTransactionCheckModule {}
