import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Headers,
  UseGuards,
  Put,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { UsersService } from '../users/users.service';
import { UserDTO } from '../users/interfaces/userDTO.interface';
import { AuthGuard } from './auth.guard';
  

// Controller -> permet de gérer les routes 
@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService, private userService: UsersService) {}

  /* Public est un décorateur que j'ai fait permettant de dire qu'une route est publique et que nous n'avons pas
  *  besoin d'être connecté pour y accéder
  */
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) : Promise<string> {
    return this.authService.signIn(signInDto.login, signInDto.password);
  }
  
  /* UseGuards est un décorateur permettant de dire qu'on doit utiliser le Guard passé entre parenthèses.
  * "Un Guard sur Angular est une fonctionnalité qui vous permet de contrôler l'accès à des routes spécifiques dans votre application. 
    Vous pouvez utiliser des guards pour exécuter certaines vérifications ou actions avant de permettre l'accès à une route, 
    par exemple pour vérifier si l'utilisateur est authentifié ou a les droits d'accès appropriés."
  */
  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Headers('login') login: string): Promise<UserDTO> {
    return this.userService.getDataFromUser(login);
  }

  @UseGuards(AuthGuard)
  @Put('profile')
  updateProfile(
    @Body('lastName') lastName: string,
    @Body('firstName') firstName: string,
    @Body('mailAddress') mailAddress: string, 
    @Body('postalAddress') postalAddress: string, 
    @Body('zipCode') zipCode: string, 
    @Body('city') city: string, 
    @Body('country') country: string, 
    @Body('login') login: string
  ) : Promise<UserDTO> {
    return this.userService.updateUser(lastName, firstName, mailAddress, postalAddress, zipCode, city, country, login);
  }
}