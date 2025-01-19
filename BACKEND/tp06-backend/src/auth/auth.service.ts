import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RegisterDTO } from './interfaces/RegisterDTO';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  

  async register(registerDTO: RegisterDTO): Promise<string> {
    const {
      login,
      password,
      lastName,
      firstName,
      mailAddress,
      postalAddress,
      zipCode,
      city,
      country,
    } = registerDTO;

    const existingUser = await this.prisma.user.findFirst({
      where: {
        OR: [{ login }, { mailAddress }],
      },
    });

    if (existingUser) {
      throw new ConflictException('Login ou adresse mail déjà utilisé');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.prisma.user.create({
      data: {
        login,
        password: hashedPassword,
        lastName,
        firstName,
        mailAddress,
        postalAddress,
        zipCode,
        city,
        country,
      },
    });

    return `User ${user.login} created !`;
  }

  async signIn(login: string, password: string): Promise<string> {
    const user = await this.prisma.user.findFirst({
      where: { login },
    });
  
    if (!user) {
      throw new UnauthorizedException('User can not be found');
    }
  
    const isPasswordValid = await bcrypt.compare(password, user.password);
      
    if (!isPasswordValid) {
      throw new UnauthorizedException('Incorrect password');
    }
  
    const payload = { id: user.id, login: user.login };
    return this.jwtService.sign(payload);
  }
  
}
