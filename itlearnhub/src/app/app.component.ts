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

  constructor(private router: Router, public authService: AuthService) {
  }

  ngOnInit(): void {
    const storedUser = localStorage.getItem('userData');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
  
      // Проверяем, существуют ли first_name и role в данных
      if (userData.first_name && userData.role) {
        this.user = {
          name: userData.first_name,
          role: userData.role
        };
        this.authService.setRole(this.user.role);
      }
    } else {
      this.user = { name: 'Guest', role: 'visitor' };  // Значения по умолчанию
    }
    
  }

  logout(): void {
    this.router.navigate(['/login']);
    this.authService.setRole("visitor");
    this.authService.logout();
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
