import { Injectable } from '@nestjs/common';
import { DimLocation } from 'src/@generated/prisma-nestjs-graphql/dim-location/dim-location.model';
import { DimLocationCreateInput } from 'src/@generated/prisma-nestjs-graphql/dim-location/dim-location-create.input';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DimLocationService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<DimLocation[]> {
    return this.prismaService.dimLocation.findMany();
  }

  async findOne(LocationID: number): Promise<DimLocation | null> {
    return this.prismaService.dimLocation.findUnique({
      where: { LocationID },
    });
  }

  async create(createData: DimLocationCreateInput): Promise<DimLocation> {
    return this.prismaService.dimLocation.create({
      data: createData,
    });
  }
}
