import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ValidatorFn,
  ValidationErrors,
  AbstractControl,
} from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { MockBackendService } from '../mock-backend.service';

export function ConfirmPasswordValidator(
  controlName: string,
  matchingControlName: string
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!(control instanceof FormGroup)) {
      throw new Error(
        'ConfirmPasswordValidator must be applied to a FormGroup'
      );
    }

    const formGroup = control as FormGroup;
    const controlToMatch = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    if (matchingControl.errors && !matchingControl.errors['Missmatched']) {
      return null;
    }

    // Set error on matchingControl if validation fails
    if (controlToMatch.value !== matchingControl.value) {
      matchingControl.setErrors({ Missmatched: true });
      return { Missmatched: true };
    } else {
      matchingControl.setErrors(null);
      return null;
    }
  };
}

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css',
})
export class UserLoginComponent {
  showSignIn: boolean = true;
  showSignUp: boolean = false;
  signInForm: FormGroup;
  signUpForm: FormGroup;
  errorMessage: string = '';

  // constructor(
  //   private mockBackendService: MockBackendService,
  //   private router: Router
  // )
  constructor(private authService: AuthService, private router: Router) {
    this.signInForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });

    this.signUpForm = new FormGroup(
      {
        username: new FormControl('', [Validators.required]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
        ]),
        password_confirmation: new FormControl('', [Validators.required]),
      },
      {
        validators: ConfirmPasswordValidator(
          'password',
          'password_confirmation'
        ),
      }
    );
  }

  toggleForm() {
    this.showSignIn = !this.showSignIn;
    this.showSignUp = !this.showSignUp;
  }

  getFormErrors(form: FormGroup): string[] {
    const errors: string[] = [];

    Object.keys(form.controls).forEach((key) => {
      const controlErrors = form.get(key)?.errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach((keyError) => {
          errors.push(`${key} : ${keyError}`);
        });
      }
    });

    return errors;
  }

  onSignIn(): void {
    console.log(this.signInForm.value);
    if (this.signInForm.valid) {
      this.authService.signIn(this.signInForm.value).subscribe(
        // this.mockBackendService.signIn(this.signInForm.value).subscribe(
        (response) => {
          console.log(response);
          localStorage.setItem('token', response['access token']);
          this.router.navigate(['/dashboard']);
        },
        (error) => {
          this.errorMessage = 'An error occurred: ' + error.message;
          console.error('Login error:', error);
        }
      );
    }
  }

  onSignUp(): void {
    if (this.signUpForm.valid) {
      console.log(this.signUpForm.value);
      this.authService.signUp(this.signUpForm.value).subscribe(
        // this.mockBackendService.signUp(this.signUpForm.value).subscribe(
        (response) => {},
        (error) => {
          this.errorMessage = 'An error occurred: ' + error.message;
          console.error('Registration error:', error);
        }
      );
    }
  }
}
