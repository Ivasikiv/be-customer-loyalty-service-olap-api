import { Injectable } from '@nestjs/common';
import { DimAssortmentSegment } from 'src/@generated/prisma-nestjs-graphql/dim-assortment-segment/dim-assortment-segment.model';
import { DimAssortmentSegmentCreateInput } from 'src/@generated/prisma-nestjs-graphql/dim-assortment-segment/dim-assortment-segment-create.input';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DimAssortmentSegmentService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<DimAssortmentSegment[]> {
    return this.prismaService.dimAssortmentSegment.findMany();
  }

  async findOne(
    AssortmentSegmentID: number,
  ): Promise<DimAssortmentSegment | null> {
    return this.prismaService.dimAssortmentSegment.findUnique({
      where: { AssortmentSegmentID },
    });
  }

  async create(
    createAssortmentSegment: DimAssortmentSegmentCreateInput,
  ): Promise<DimAssortmentSegment> {
    return this.prismaService.dimAssortmentSegment.create({
      data: createAssortmentSegment,
    });
  }
}
