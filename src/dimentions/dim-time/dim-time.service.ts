import { Injectable } from '@nestjs/common';
import { DimTime } from 'src/@generated/prisma-nestjs-graphql/dim-time/dim-time.model';
import { DimTimeCreateInput } from 'src/@generated/prisma-nestjs-graphql/dim-time/dim-time-create.input';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DimTimeService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<DimTime[]> {
    return this.prismaService.dimTime.findMany();
  }

  async findOne(TimeID: number): Promise<DimTime | null> {
    return this.prismaService.dimTime.findUnique({
      where: { TimeID },
    });
  }

  async create(createData: DimTimeCreateInput): Promise<DimTime> {
    const obj = await this.findOne(createData.TimeID);
    if (obj !== null) {
      return obj;
    }
    return this.prismaService.dimTime.create({
      data: createData,
    });
  }
}
