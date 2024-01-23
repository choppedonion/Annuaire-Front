import { Component, Input } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { PersonMockService } from '../person-mock.service';
import { Person } from '../models/person.model'; // Import the Person interface
import { PersonService } from '../person.service';

function genderValidator(control: AbstractControl): ValidationErrors | null {
  const validGenders = ['man', 'woman'];
  return validGenders.includes(control.value) ? null : { invalidGender: true };
}

@Component({
  selector: 'app-add-person-form',
  templateUrl: './add-person-form.component.html',
  styleUrls: ['./add-person-form.component.css'], // Corrected 'styleUrl' to 'styleUrls'
})
export class AddPersonFormComponent {
  personForm: FormGroup;
  @Input() showAddPersonForm: boolean = false;

  constructor(
    private fb: FormBuilder,
    // private personService: PersonMockService
    private personService: PersonService
  ) {
    this.personForm = this.fb.group({
      // firstName: ['', Validators.required],
      // lastName: ['', Validators.required],
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      address: ['', Validators.required],
      gender: ['', [Validators.required, genderValidator]],
      role: ['', Validators.required], // Added 'role' field
      description: [''], // Added 'description' field
    });
  }

  onSubmit() {
    if (this.personForm.valid) {
      // Extract the form data
      const newPerson: Person = this.personForm.value;

      // Call the addPerson method from PersonService
      this.personService.addPerson(newPerson).subscribe({
        next: (person) => {
          // Handle the successful response here
          console.log('Person added successfully', person);
          this.personForm.reset(); // Reset the form after successful submission
          // You might also want to hide the form or navigate the user to another view
        },
        error: (error) => {
          // Handle errors here
          console.error('Error adding person', error);
        },
      });
    } else {
      // Handle the case when the form is not valid
      // You might want to display validation error messages or a generic error message
      console.error('Form is not valid');
    }
  }
}
