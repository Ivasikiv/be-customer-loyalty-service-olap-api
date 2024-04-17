import { Module } from '@nestjs/common';
import { FactTransactionItemService } from './fact-transaction-item.service';
import { FactTransactionItemResolver } from './fact-transaction-item.resolver';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [
    FactTransactionItemService,
    FactTransactionItemResolver,
    PrismaService,
  ],
  exports: [FactTransactionItemService],
})
export class FactTransactionItemModule {}
