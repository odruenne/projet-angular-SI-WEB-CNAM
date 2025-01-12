import { Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface';

import * as usersData from './data/users.json'
import * as usersDTO from './data/usersDTO.json'
import { UserDTO } from './interfaces/userDTO.interface';

import * as fs from 'fs';

@Injectable()
export class UsersService {
    private readonly users: User[] = [];
    private readonly usersDataDTO: UserDTO[] = [];

    constructor() {
        this.users = usersData as User[];
        this.usersDataDTO = usersDTO as UserDTO[];
    }

    async findOne(login: string): Promise<User | undefined> {
        return this.users.find(user => user.login === login);
    }

    async getDataFromUser(login: string) : Promise<UserDTO | undefined> {
        return this.users.find(user => user.login === login);
    }

    async updateUser(
        lastName: string,
        firstName: string,
        mailAddress: string,
        postalAddress: string,
        zipCode: string,
        city: string,
        country: string,
        login: string
      ): Promise<UserDTO> {
        const userIndex = this.usersDataDTO.findIndex(user => user.login === login);
      
        this.usersDataDTO[userIndex] = {
          ...this.usersDataDTO[userIndex],
          lastName,
          firstName,
          mailAddress,
          postalAddress,
          zipCode,
          city,
          country,
        };
      
        try {
          fs.writeFileSync('./src/users/data/usersDTO.json', JSON.stringify(this.usersDataDTO, null, 2), 'utf8');
          return this.usersDataDTO[userIndex]; 
        } catch (error) {
          throw new Error(`Error: ${error.message}`);
        }
      }
}
