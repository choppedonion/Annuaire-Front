import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { Person } from './models/person.model';

@Injectable({
  providedIn: 'root',
})
export class PersonMockService {
  private mockPersons: Person[] = [
    // {
    //   id: 1,
    //   firstName: 'Fatima',
    //   lastName: 'Zahra',
    //   email: 'fatima.zahra@example.ma',
    //   phoneNumber: '06-1234-5678',
    //   address: '123 Boulevard Mohammed VI, Casablanca, 20000',
    //   gender: 'woman',
    // },
    // {
    //   id: 2,
    //   firstName: 'Youssef',
    //   lastName: 'El Khatib',
    //   email: 'youssef.elkhatib@example.ma',
    //   phoneNumber: '06-8765-4321',
    //   address: '456 Rue Ibn Batouta, Rabat, 10000',
    //   gender: 'man',
    // },
    // {
    //   id: 3,
    //   firstName: 'Amina',
    //   lastName: 'Boujmiâa',
    //   email: 'amina.boujmiaa@example.ma',
    //   phoneNumber: '05-1234-5678',
    //   address: '789 Rue Moulay Ismail, Fes, 30000',
    //   gender: 'woman',
    // },
    // {
    //   id: 4,
    //   firstName: 'Khalid',
    //   lastName: 'Benmoussa',
    //   email: 'khalid.benmoussa@example.ma',
    //   phoneNumber: '05-8765-4321',
    //   address: '321 Avenue Hassan II, Marrakech, 40000',
    //   gender: 'man',
    // },
  ];

  constructor() {}

  getPersons(): Observable<Person[]> {
    return of(this.mockPersons);
  }

  addPerson(newPerson: Person): Observable<Person[]> {
    const newId =
      this.mockPersons.length > 0
        ? Math.max(...this.mockPersons.map((p) => p.id)) + 1
        : 1;
    newPerson.id = newId;
    this.mockPersons.push(newPerson);
    return of(this.mockPersons);
  }

  deletePerson(personId: number): Observable<Person[]> {
    const index = this.mockPersons.findIndex((p) => p.id === personId);
    if (index !== -1) {
      this.mockPersons.splice(index, 1);
    }
    return of(this.mockPersons);
  }

  updatePerson(updatedPerson: Person): Observable<Person[]> {
    const index = this.mockPersons.findIndex((p) => p.id === updatedPerson.id);
    if (index !== -1) {
      this.mockPersons[index] = updatedPerson;
    }
    return of(this.mockPersons);
  }
}
