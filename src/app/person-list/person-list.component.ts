import { Component, OnInit } from '@angular/core';
import { Person } from '../models/person.model';
import { PersonService } from '../person.service';
import { PersonMockService } from '../person-mock.service';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrl: './person-list.component.css',
})
export class PersonListComponent implements OnInit {
  persons: Person[] = [];

  // constructor(private personService: PersonService) {}
  constructor(private personService: PersonMockService) {}

  // ngOnInit(): void {
  //   this.personService.getPersons().subscribe(
  //     (data) => {
  //       this.persons = data;
  //     },
  //     (error) => {
  //       console.error('Error fetching persons:', error);
  //     }
  //   );
  // }

  ngOnInit(): void {
    this.personService.getPersons().subscribe((data) => {
      this.persons = data;
    });
  }

  getCardHeaderClass(gender: 'man' | 'woman'): string {
    return gender === 'man' ? 'bg-primary' : 'women-card';
  }

  deletePerson(id: number): void {
    // Call the deletePerson method from your service and pass the person's ID
    this.personService.deletePerson(id).subscribe((data) => {
      // Update the list of persons after deleting
      this.persons = data;
    });
  }

  // Function to navigate to the edit page/modal
  editPerson(id: number): void {
    // Implement navigation logic to the edit page/modal for the selected person
    // You can use Angular Router for navigation
  }
}
