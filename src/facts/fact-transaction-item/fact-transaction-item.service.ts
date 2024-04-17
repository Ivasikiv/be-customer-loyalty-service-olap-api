import { Injectable } from '@nestjs/common';
import { FactTransactionItem } from 'src/@generated/prisma-nestjs-graphql/fact-transaction-item/fact-transaction-item.model';
import { FactTransactionItemCreateInput } from 'src/@generated/prisma-nestjs-graphql/fact-transaction-item/fact-transaction-item-create.input';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FactTransactionItemService {
  constructor(private readonly prismaService: PrismaService) {}
  async findAll(): Promise<FactTransactionItem[]> {
    return await this.prismaService.factTransactionItem.findMany();
  }

  async findOne(
    TransactionItemID: number,
  ): Promise<FactTransactionItem | null> {
    return await this.prismaService.factTransactionItem.findUnique({
      where: { TransactionItemID },
    });
  }

  async create(
    createUser: FactTransactionItemCreateInput,
  ): Promise<FactTransactionItem> {
    return await this.prismaService.factTransactionItem.create({
      data: createUser,
    });
  }

  async remove(TransactionItemID: number): Promise<FactTransactionItem> {
    return await this.prismaService.factTransactionItem.delete({
      where: { TransactionItemID },
    });
  }
}
