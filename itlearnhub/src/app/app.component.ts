import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'itlearnhub';
  user: { role: 'visitor' | 'student' | 'teacher'; name: string } | null = null;
  loginEmail: string = '';
  loginPassword: string = '';
  showNavbar: boolean = true;

  constructor(private router: Router, public authService: AuthService) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showNavbar = !event.url.includes('/register');
      }
    });
  }

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe(
      (user) => {
        this.user = user;
      },
      (error) => {
        console.error('Error fetching user:', error);
        this.user = { role: 'visitor', name: 'Visitor' }; // Установка значения по умолчанию
      }
    );
  }

  logout(): void {
    this.authService.logout();
    this.authService.getCurrentUser().subscribe(
      (user) => {
        this.user = user;
      },
      (error) => {
        console.error('Error after logout:', error);
        this.user = { role: 'visitor', name: 'Visitor' };
      }
    );
    alert('You have been logged out.');
  }

  switchToVisitor(): void {
    this.authService.setRole('visitor');
    this.updateUserState();
  }

  switchToStudent(): void {
    this.authService.setRole('student');
    this.updateUserState();
  }

  switchToTeacher(): void {
    this.authService.setRole('teacher');
    this.updateUserState();
  }

  private updateUserState(): void {
    this.authService.getCurrentUser().subscribe(
      (user) => {
        this.user = user;
      },
      (error) => {
        console.error('Error updating user:', error);
        this.user = { role: 'visitor', name: 'Visitor' };
      }
    );
  }
}
