import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../environments/environment'
import { Router } from '@angular/router';
import { UserDTO } from '../models/UserDTO';
import { AuthService } from './auth.service';

/* AccountService est un service dans le front qui va appeler l'API pour récupérer les données de l'utilisateur */
@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private authService: AuthService,
  ) {}


  public getDataFromUser(): Observable<UserDTO> {
    let login: string = this.authService.getLoginFromLoggedInUser();
    const headers = { 'login': login };
    return this.httpClient.get<UserDTO>(`${environment.backendURL}/auth/profile`, { headers });
  }

  public updateUserData(userDTO: UserDTO): Observable<UserDTO> {
    const login: string = this.authService.getLoginFromLoggedInUser();
    
    const userDTOWithLogin = { ...userDTO, login };
  
    return this.httpClient.put<UserDTO>(`${environment.backendURL}/auth/profile`, userDTOWithLogin);
  }
}