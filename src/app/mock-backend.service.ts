import { Injectable } from '@angular/core';
import { of, throwError } from 'rxjs';

interface User {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class MockBackendService {
  private users: User[] = [{ username: 'admin', password: 'admin' }];

  signIn(credentials: any) {
    const user = this.users.find(
      (u) =>
        u.username === credentials.username &&
        u.password === credentials.password
    );
    if (user) {
      console.log('Authentification réussie');
      return of({ token: 'mock-jwt-token' });
    } else {
      console.log('Identifiants invalides');
      return throwError(() => new Error('Identifiants invalides'));
    }
  }

  signUp(data: any) {
    const userExists = this.users.some((u) => u.username === data.username);
    if (userExists) {
      return throwError(() => new Error("Le nom d'utilisateur existe déjà"));
    } else {
      this.users.push({ username: data.username, password: data.password });
      console.log('Inscription réussie');
      return of({ message: 'Inscription réussie' });
    }
  }
}
