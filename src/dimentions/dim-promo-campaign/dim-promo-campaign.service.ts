import { Injectable } from '@nestjs/common';
import { DimPromoCampaign } from 'src/@generated/prisma-nestjs-graphql/dim-promo-campaign/dim-promo-campaign.model';
import { DimPromoCampaignCreateInput } from 'src/@generated/prisma-nestjs-graphql/dim-promo-campaign/dim-promo-campaign-create.input';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DimPromoCampaignService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<DimPromoCampaign[]> {
    return this.prismaService.dimPromoCampaign.findMany();
  }

  async findOne(PromoCampaignID: number): Promise<DimPromoCampaign | null> {
    return this.prismaService.dimPromoCampaign.findUnique({
      where: { PromoCampaignID },
    });
  }

  async create(
    createData: DimPromoCampaignCreateInput,
  ): Promise<DimPromoCampaign> {
    return this.prismaService.dimPromoCampaign.create({
      data: createData,
    });
  }
}
