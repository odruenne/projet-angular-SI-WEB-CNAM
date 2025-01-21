import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from "../app/services/auth.service"
import { MessageService } from './services/message.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router, private messageService: MessageService) {}

  canActivate(): boolean {
    if (this.authService.isTokenExpired()) {
      this.messageService.setMessage("obligationConnexion","Vous devez être connecté afin d'accéder à cette page.");
      this.router.navigate(['/logout']);
      return false;
    }
    return true;
  }
}