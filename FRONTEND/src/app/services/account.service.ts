import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment'
import { UserDTO } from '../models/UserDTO';
import { AuthService } from './auth.service';
import { UpdateUserDTO } from '../models/UpdateUserDTO';
import { UpdatePasswordDTO } from '../models/UpdatePasswordDTO';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(
    private httpClient: HttpClient,
    private authService: AuthService,
  ) {}


  public getDataFromUser(): Observable<UserDTO> {
    let id: number = this.authService.getIDFromLoggedInUser();
    return this.httpClient.get<UserDTO>(`${environment.backendURL}/user/${id}`);
  }

  public updateUserData(userDTO: UpdateUserDTO): Observable<UpdateUserDTO> {
    let id: number = this.authService.getIDFromLoggedInUser();
    return this.httpClient.put<UpdateUserDTO>(`${environment.backendURL}/update-user-data/${id}`, userDTO);
  }


  public updateUserPassword(updatedPasswordDTO: UpdatePasswordDTO) : Observable<UserDTO> {
    let id: number = this.authService.getIDFromLoggedInUser();
    return this.httpClient.put<UserDTO>(`${environment.backendURL}/update-user-password/${id}`, updatedPasswordDTO);
  }

  public deleteUserAccount() : Observable<UserDTO> {
    let id: number = this.authService.getIDFromLoggedInUser();

    return this.httpClient.delete<UserDTO>(`${environment.backendURL}/delete-user/${id}`);
  }
}