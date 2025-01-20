
import { Injectable } from '@nestjs/common';
import { User, Prisma } from '@prisma/client';
import { User as UserInterface } from './interfaces/user.interface'
import * as bcrypt from 'bcryptjs';
import { PrismaService } from 'src/prisma.service';


@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async comparePasswords(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }
  
  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async findUserById(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async user(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async users(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<User[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createUser(data: UserInterface) {
    const existingUser = await this.prisma.user.findFirst({
      where: {
        OR: [
          { login: data.login },
          { mailAddress: data.mailAddress }
        ]
      }
    });
  
    if (existingUser) {
      throw new Error(`L'utilisateur avec le login "${data.login}" ou l'adresse email "${data.mailAddress}" existe déjà.`);
    }
  
    const hashedPassword = await this.hashPassword(data.password);
    return this.prisma.user.create({
      data: {
        login: data.login,
        password: hashedPassword,
        lastName: data.lastName,
        firstName: data.firstName,
        mailAddress: data.mailAddress,
        postalAddress: data.postalAddress,
        zipCode: data.zipCode,
        city: data.city,
        country: data.country,
      },
    });
  }
  
  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const { where, data } = params;
    return this.prisma.user.update({
      data,
      where,
    });
  }

  async updatePasswordUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: { password: string };
  }): Promise<User> {
    const { where, data } = params;
    
    return this.prisma.user.update({
      data,
      where,
    });
  }
  
  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({
      where,
    });
  }
}
