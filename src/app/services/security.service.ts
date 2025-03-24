import { Injectable } from '@angular/core';
import { appsettings } from '../settings/appsettings';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProduct } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  private baseUrl: string = appsettings.apiURL;

  constructor(
    private http: HttpClient
  ) { }

  getProducts (): Observable<IProduct> {
    const token = localStorage.getItem('authToken');

    const headers = new HttpHeaders({
      'Authorization': `${token}`
    });
    
    return this.http.get<IProduct>(`${this.baseUrl}/product`, { headers });
  }
}
