
import { Injectable } from '@nestjs/common';
import {  Kibble, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class KibblesService {
  constructor(private prisma: PrismaService) {}

  async kibble(
    kibbleWhereUniqueInput: Prisma.KibbleWhereUniqueInput,
  ): Promise<Kibble | null> {
    return this.prisma.kibble.findUnique({
      where: kibbleWhereUniqueInput,
    });
  }

  async kibbles(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.KibbleWhereUniqueInput;
    where?: Prisma.KibbleWhereInput;
    orderBy?: Prisma.KibbleOrderByWithRelationInput;
  }): Promise<Kibble[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.kibble.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createkibble(data: Prisma.KibbleCreateInput): Promise<Kibble> {
    return this.prisma.kibble.create({
      data,
    });
  }

  async updatekibble(params: {
    where: Prisma.KibbleWhereUniqueInput;
    data: Prisma.KibbleUpdateInput;
  }): Promise<Kibble> {
    const { data, where } = params;
    return this.prisma.kibble.update({
      data,
      where,
    });
  }

  async deletekibble(where: Prisma.KibbleWhereUniqueInput): Promise<Kibble> {
    return this.prisma.kibble.delete({
      where,
    });
  }
}
