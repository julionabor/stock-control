import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from 'src/environments/environment';
import {
  SignupUserRequest,
  SignupUserResponse,
} from '../models/interfaces/user';
import { Observable } from 'rxjs';
import { AuthRequest } from '../models/interfaces/auth/auth-request';
import { AuthResponse } from '../models/interfaces/auth/auth-response';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private API_URL = enviroment.API_URL;

  constructor(private httpClient: HttpClient) {}
  signupUser(requestDatas: SignupUserRequest): Observable<SignupUserResponse> {
    return this.httpClient.post<SignupUserResponse>(
      `${this.API_URL}/user`,
      requestDatas
    );
  }
  authUser(requestDatas: AuthRequest): Observable<AuthResponse>{
    return this.httpClient.post<AuthResponse>(`${this.API_URL}/auth`, requestDatas)
  }
}
