import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from 'src/environments/environment';
import {
  SignupUserRequest,
  SignupUserResponse,
} from '../../models/interfaces/user/auth/user';
import { Observable } from 'rxjs';
import { AuthRequest } from '../../models/interfaces/user/auth/auth-request';
import { AuthResponse } from '../../models/interfaces/user/auth/auth-response';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private API_URL = enviroment.API_URL;

  constructor(private httpClient: HttpClient, private cookie: CookieService) {}
  signupUser(requestDatas: SignupUserRequest): Observable<SignupUserResponse> {
    return this.httpClient.post<SignupUserResponse>(
      `${this.API_URL}/user`,
      requestDatas
    );
  }
  authUser(requestDatas: AuthRequest): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(
      `${this.API_URL}/auth`,
      requestDatas
    );
  }
  isLoggedIn(): boolean{
    // Verificar se utilizador possui token ou cookie
    const JWT_TOKEN = this.cookie.get('USER_INFO');
    return JWT_TOKEN ? true : false;
  }
}
