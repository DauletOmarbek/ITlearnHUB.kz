import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {
  email = '';
  firstName = '';
  lastName = '';
  password1 = '';
  password2 = '';
  role = 'student';
  errorMessage = '';

  constructor(private authService: AuthService) {
  }

  register() {
    if (this.password1 !== this.password2) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    const userData = {
      first_name: this.firstName,
      last_name: this.lastName,
      email: this.email,
      password1: this.password1,
      password2: this.password2,
      role: this.role,
    };

    this.authService.getCsrfToken();
    setTimeout(() => {
    this.authService.signUp(userData).subscribe(
    (response) => {
      console.log('Registration successful', response);
    },
    (error) => {
      console.error('Registration error:', error);
    }
  );
}, 1000);
  }
}
