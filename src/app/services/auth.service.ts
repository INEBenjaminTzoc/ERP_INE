import { Injectable } from '@angular/core';
import { appsettings } from '../settings/appsettings';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ILoginPayload, ILoginResponse } from '../interfaces/login.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl: string = appsettings.apiURL;

  constructor(
    private http: HttpClient
  ) { }

  login(loginPayload: ILoginPayload): Observable<ILoginResponse> {
    return this.http.post<ILoginResponse>(`${this.baseUrl}/user/login`, 
      {
        username: loginPayload.username,
        password: loginPayload.password,
      })
  }
}
