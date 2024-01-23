import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl + '/users/api';

  constructor(private http: HttpClient) {}

  signIn(credentials: any): Observable<any> {
    const body = new HttpParams()
      .set('username', credentials.username)
      .set('password', credentials.password);
    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*',
        'Content-type': 'application/x-www-form-urlencoded',
      }),
    };
    return this.http.post(`${this.apiUrl}/login`, body);
  }

  signUp(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }
}
