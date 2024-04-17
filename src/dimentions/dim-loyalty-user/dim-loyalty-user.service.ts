import { Injectable } from '@nestjs/common';
import { DimLoyaltyUser } from 'src/@generated/prisma-nestjs-graphql/dim-loyalty-user/dim-loyalty-user.model';
import { DimLoyaltyUserCreateInput } from 'src/@generated/prisma-nestjs-graphql/dim-loyalty-user/dim-loyalty-user-create.input';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DimLoyaltyUserService {
  constructor(private readonly prismaService: PrismaService) {}
  async findAll(): Promise<DimLoyaltyUser[]> {
    return await this.prismaService.dimLoyaltyUser.findMany();
  }

  async findOne(LoyaltyUserID: number): Promise<DimLoyaltyUser | null> {
    return await this.prismaService.dimLoyaltyUser.findUnique({
      where: { LoyaltyUserID },
    });
  }

  async create(createUser: DimLoyaltyUserCreateInput): Promise<DimLoyaltyUser> {
    return await this.prismaService.dimLoyaltyUser.create({
      data: createUser,
    });
  }
}
