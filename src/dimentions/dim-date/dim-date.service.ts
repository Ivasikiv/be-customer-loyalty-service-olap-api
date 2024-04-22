import { Injectable } from '@nestjs/common';
import { DimDate } from 'src/@generated/prisma-nestjs-graphql/dim-date/dim-date.model';
import { DimDateCreateInput } from 'src/@generated/prisma-nestjs-graphql/dim-date/dim-date-create.input';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DimDateService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<DimDate[]> {
    return this.prismaService.dimDate.findMany();
  }

  async findOne(DateID: number): Promise<DimDate | null> {
    return this.prismaService.dimDate.findUnique({
      where: { DateID },
    });
  }

  async create(createData: DimDateCreateInput): Promise<DimDate> {
    const obj = await this.findOne(createData.DateID);
    if (obj !== null) {
      return obj;
    }
    return this.prismaService.dimDate.create({
      data: createData,
    });
  }
}
