import { Injectable } from '@nestjs/common';
import { DimLoyaltyCard } from 'src/@generated/prisma-nestjs-graphql/dim-loyalty-card/dim-loyalty-card.model';
import { DimLoyaltyCardCreateInput } from 'src/@generated/prisma-nestjs-graphql/dim-loyalty-card/dim-loyalty-card-create.input';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DimLoyaltyCardService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<DimLoyaltyCard[]> {
    return this.prismaService.dimLoyaltyCard.findMany();
  }

  async findOne(LoyaltyCardID: number): Promise<DimLoyaltyCard | null> {
    return this.prismaService.dimLoyaltyCard.findUnique({
      where: { LoyaltyCardID },
    });
  }

  async create(createData: DimLoyaltyCardCreateInput): Promise<DimLoyaltyCard> {
    return this.prismaService.dimLoyaltyCard.create({
      data: createData,
    });
  }
}
