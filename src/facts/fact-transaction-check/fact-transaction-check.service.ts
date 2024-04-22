import { Injectable } from '@nestjs/common';
import { FactTransactionCheck } from 'src/@generated/prisma-nestjs-graphql/fact-transaction-check/fact-transaction-check.model';
import { FactTransactionCheckCreateInput } from 'src/@generated/prisma-nestjs-graphql/fact-transaction-check/fact-transaction-check-create.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateFactTransactionCheckInput } from './dto/create-fact-transaction-check.input';

@Injectable()
export class FactTransactionCheckService {
  constructor(private readonly prismaService: PrismaService) {}
  async findAll(): Promise<FactTransactionCheck[]> {
    return await this.prismaService.factTransactionCheck.findMany();
  }

  async findOne(
    TransactionCheckID: number,
  ): Promise<FactTransactionCheck | null> {
    return await this.prismaService.factTransactionCheck.findUnique({
      where: { TransactionCheckID },
    });
  }

  async create(
    createUser: CreateFactTransactionCheckInput,
  ): Promise<FactTransactionCheck> {
    const obj = await this.findOne(createUser.TransactionCheckID);
    if (obj !== null) {
      return obj;
    }
    await this.prismaService.factTransactionCheck.create({
      data: createUser,
    });
    return await this.findOne(createUser.TransactionCheckID);
  }

  async remove(TransactionCheckID: number): Promise<FactTransactionCheck> {
    return await this.prismaService.factTransactionCheck.delete({
      where: { TransactionCheckID },
    });
  }
}
