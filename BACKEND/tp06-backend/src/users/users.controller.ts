import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from "@nestjs/common";
import { User } from '@prisma/client';
import { User as UserInterface } from './interfaces/user.interface'
import { UsersService } from "./users.service";
import { Public } from "src/auth/decorators/public.decorator";
import { UpdatePasswordDTO } from "./interfaces/updatePasswordDTO";

@Controller() 
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get('user/:id')
    async getUserByID(@Param ('id') id: string): Promise <User> {
        return this.usersService.user({id: Number(id)});
    }

    @Public()
    @Post('register-user')
    async registerUser(
        @Body() userData: UserInterface,
    ): Promise<User> {
        return this.usersService.createUser(userData);
    }

    @Put('update-user-data/:id')
    async updateUserData(
        @Param('id') id: string,
        @Body() userData: UserInterface,
    ): Promise<User> {
        return this.usersService.updateUser({
            where: { id: Number(id) },
            data: {
                lastName: userData.lastName,
                firstName: userData.firstName,
                mailAddress: userData.mailAddress,
                postalAddress: userData.postalAddress,
                zipCode: userData.zipCode,
                city: userData.city,
                country: userData.country,
            },
        });
    }

    @Put('update-user-password/:id')
    async updateUserPassword(
      @Param('id') id: string,
      @Body() updatePasswordDTO: UpdatePasswordDTO
    ): Promise<User> {
      const user = await this.usersService.findUserById(Number(id));
    
      if (!user) {
        throw new NotFoundException('Utilisateur non trouvé');
      }
    
      const isPasswordValid = await this.usersService.comparePasswords(updatePasswordDTO.password, user.password);
      if (!isPasswordValid) {
        throw new BadRequestException('Le mot de passe actuel est incorrect.');
      }
    
      if (updatePasswordDTO.password === updatePasswordDTO.password) {
        throw new BadRequestException('Le nouveau mot de passe ne peut pas être identique à l’ancien.');
      }
    
      const hashedPassword = await this.usersService.hashPassword(updatePasswordDTO.password);
      return this.usersService.updatePasswordUser({
        where: { id: Number(id) },
        data: { password: hashedPassword },
      });
    }
    

    @Delete('delete-user/:id')
    async deleteUserAccount(@Param('id') id: string): Promise<User> {
        return this.usersService.deleteUser({ id: Number(id) });
    }

}