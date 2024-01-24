import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Person } from './models/person.model';
import { environment } from './environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  private apiUrl = environment.apiUrl + '/contacts';

  constructor(private http: HttpClient) {}

  getPersons(): Observable<any> {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    return this.http.get<any>(this.apiUrl, { headers: headers });
  }

  addPerson(newPerson: Person): Observable<Person> {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
//console.log(headers)
    return this.http.post<Person>(this.apiUrl + '/add', newPerson, {
      headers: headers,
    });
  }

  deletePerson(personId: number): Observable<void> {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    const url = `${this.apiUrl}/${personId}`;

    return this.http.delete<void>(url, { headers: headers });
  }

  updatePerson(personId: number, updatedPerson: Person): Observable<Person> {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    const url = `${this.apiUrl}/${personId}`;

    return this.http.put<Person>(url, updatedPerson, { headers: headers });
  }
}
