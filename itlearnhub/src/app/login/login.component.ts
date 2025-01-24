import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
      this.authService.login(this.email, this.password).subscribe(
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
  }
}
