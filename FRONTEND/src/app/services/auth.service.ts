import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../environments/environment'
import { LoginDTO } from '../models/LoginDTO';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';


/* AuthService est un service dans le front qui va gérer tout ce qui est en lien avec la connexion */
@Injectable({
  providedIn: 'root',
})

export class AuthService {
 
  constructor(private httpClient: HttpClient, private router: Router, private jwtService : JwtHelperService) { }

  public login(loginDTO: LoginDTO) : Observable<string> {
    return this.httpClient.post(
      environment.backendURL + "/auth/login", 
      loginDTO,
      {responseType: 'text'}
    )
    .pipe(
      tap((res) => localStorage.setItem(environment.access_token, res))
    );
  }

  public isTokenExpired() : boolean {
    return this.jwtService.isTokenExpired(this.getTokenFromLocalStorage());
  }

  public logout() : void {
    localStorage.removeItem(environment.access_token); 
  }

  public getTokenFromLocalStorage(): string | null {
    return localStorage.getItem(environment.access_token); 
  }
  
  public getLoginFromLoggedInUser(): string {
    const token = this.getTokenFromLocalStorage();
    
    if (token) {
      const decodedToken = this.jwtService.decodeToken(token);
      return decodedToken?.login || '';
    } else {
      return ''; 
    }
  }
  
  public getTokenFromLoggedInUser() : string {
    const token = this.getTokenFromLocalStorage();
    
    if (token) {
      const decodedToken = this.jwtService.decodeToken(token);
      return decodedToken;
    } else {
      return '';
    }
  }
}