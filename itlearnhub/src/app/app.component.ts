import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'itlearnhub';
  user: { role: 'visitor' | 'student' | 'teacher'; name: string } | null = null;

  constructor(public authService: AuthService) {} // Теперь public

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser(); // Инициализация внутри ngOnInit
  }

  switchToVisitor() {
    this.authService.setRole('visitor');
    this.user = this.authService.getCurrentUser();
  }

  switchToStudent() {
    this.authService.setRole('student');
    this.user = this.authService.getCurrentUser();
  }

  switchToTeacher() {
    this.authService.setRole('teacher');
    this.user = this.authService.getCurrentUser();
  }
}
