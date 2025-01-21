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

  login(): void {
    if (this.authService.login(this.email, this.password)) {
      const role = this.authService.getRole();
      this.router.navigate([role === 'teacher' ? '/teacher-dashboard' : '/student-dashboard']);
    } else {
      this.errorMessage = 'Invalid email or password.';
    }
  }
}
