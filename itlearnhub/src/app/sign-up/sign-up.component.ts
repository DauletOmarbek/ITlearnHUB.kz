import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';


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

  constructor(private authService: AuthService, private router: Router) {
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

    // this.authService.getCsrfToken();
    setTimeout(() => {
    this.authService.signUp(userData).subscribe(
    (response) => {
      console.log('Registration successful', response);
      this.authService.login(this.email, this.password1).subscribe(
        (response) => {
          alert('Login successful!');
          console.log('User:', response.user);
          this.authService.getUserDetails(this.email)
          this.router.navigate(['/'])
        },
        (error) => {
          this.errorMessage = 'Invalid email or password.';
        }
      );
    },
    (error) => {
      console.error('Registration error:', error);
    }
  );
}, 1000);
  }
}
