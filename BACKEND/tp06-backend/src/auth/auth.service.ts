import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';


// Service -> Va gérer les fonctions 
@Injectable()
export class AuthService {

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(login: string, password: string) {
    const user = await this.usersService.findOne(login);
    
    if (user?.password !== password) {
      throw new UnauthorizedException();
    }

    const payload = { login: user.login };
    return await this.jwtService.signAsync(payload);
  }
}