import { Component, OnInit } from '@angular/core';
import { Person } from '../models/person.model';
import { PersonService } from '../person.service';
import { PersonMockService } from '../person-mock.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddPersonFormComponent } from '../add-person-form/add-person-form.component';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrl: './person-list.component.css',
})
export class PersonListComponent implements OnInit {
  persons: Person[] = [];

  constructor(private personService: PersonService,private dialog: MatDialog) {}

  ngOnInit(): void {
    this.personService.getPersons().subscribe(
      (data) => {
        console.log(data)
        this.persons = data._embedded.contacts;
      },
      (error) => {
        console.error('Error fetching persons:', error);
      }
    );
  }

  // ngOnInit(): void {
  //   this.personService.getPersons().subscribe((data) => {
  //     this.persons = data;
  //   });
  // }

  getCardHeaderClass(gender: 'man' | 'woman'): string {
    return gender === 'man' ? 'bg-primary' : 'women-card';
  }

  deletePerson(id: number): void {
    // Call the deletePerson method from your service and pass the person's ID
    this.personService.deletePerson(id).subscribe((data) => {
      // Update the list of persons after deleting
      this.persons.splice(this.persons.findIndex((contact) => contact.id === id), 1);
    });
  }

  // Function to navigate to the edit page/modal
  editPerson(person : Person): void {
    const DialogConfig = new MatDialogConfig();
    DialogConfig.autoFocus=true;
    // DialogConfig.width="60%";
    const dialogRef= this.dialog.open(AddPersonFormComponent,{
      width:'45%',
      height:'100%',
      panelClass:'custom-dialog',
      data:{
        person
      }
    })
    dialogRef.afterClosed().subscribe(res=>{
    })
  }
}
