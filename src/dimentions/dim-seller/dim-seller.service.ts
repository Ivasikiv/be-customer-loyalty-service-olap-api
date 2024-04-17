import { Injectable } from '@nestjs/common';
import { DimSeller } from 'src/@generated/prisma-nestjs-graphql/dim-seller/dim-seller.model';
import { DimSellerCreateInput } from 'src/@generated/prisma-nestjs-graphql/dim-seller/dim-seller-create.input';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DimSellerService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<DimSeller[]> {
    return this.prismaService.dimSeller.findMany();
  }

  async findOne(SellerID: number): Promise<DimSeller | null> {
    return this.prismaService.dimSeller.findUnique({
      where: { SellerID },
    });
  }

  async create(createData: DimSellerCreateInput): Promise<DimSeller> {
    return this.prismaService.dimSeller.create({
      data: createData,
    });
  }
}
