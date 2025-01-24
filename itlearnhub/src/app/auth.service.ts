import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs';
import { tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://127.0.0.1:8000/api/';
  private roleKey = 'userRole';
  private userKey = 'currentUser';
  // csrfToken: string | null = null;

  constructor(private http: HttpClient) {}

  // Получение CSRF-токена с бэкенда
  // getCsrfToken(): void {
  //   this.http.get<{ csrfToken: string }>(`${this.baseUrl}api/csrf/`, { withCredentials: true })
  //     .subscribe(
  //       (response) => {
  //         this.csrfToken = response.csrfToken;
  //         document.cookie = `csrftoken=${this.csrfToken}; path=/`;
  //         console.log('CSRF Token set:', this.csrfToken);
  //       },
  //       (error) => {
  //         console.error('Error fetching CSRF token:', error);
  //       }
  //     );
  // }

  // Получение CSRF токена из cookie
  private getCsrfTokenFromCookies(): string {
    const csrfCookie = document.cookie.split('; ')
      .find(row => row.startsWith('csrftoken='));
    return csrfCookie ? csrfCookie.split('=')[1] : '';
  }

  // Получение cookie
  private getCookie(name: string): string | null {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
      const [key, value] = cookie.trim().split('=');
      if (key === name) {
        return value;
      }
    }
    return null;
  }

  // Регистрация пользователя
  signUp(userData: any): Observable<any> {
  const headers = new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
    // 'X-CSRFToken': csrfToken,  // Устанавливаем CSRF токен
  });

  const formData = new URLSearchParams();
  Object.keys(userData).forEach((key) => {
    formData.append(key, userData[key]);
  });

  return this.http.post(`${this.baseUrl}register/`, formData.toString(), {
    headers,
    withCredentials: true,  // Важно для отправки cookies с запросом
  });
}
  
  
  

  // Вход пользователя
  // Авторизация
  login(email: string, password: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-CSRFToken': this.getCsrfTokenFromCookies(),
    });

    const body = new URLSearchParams();
    body.set('email', email);
    body.set('password', password);

    return this.http.post(`${this.baseUrl}login/`, body.toString(), { headers, withCredentials: true }).pipe(
      tap((response: any) => {
        if (response) {
          localStorage.setItem('userEmail', email);
          this.getUserDetails(email).subscribe(user => {
            localStorage.setItem('userData', JSON.stringify(user));
          });
        }
      })
    );
  }
  

  getUserDetails(email: string): Observable<any> {
    const url = `${this.baseUrl}get-user-by-email/?email=${encodeURIComponent(email)}`;
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });

    return this.http.get(url, { headers, withCredentials: true });
  }

  // Получение данных текущего пользователя
  getCurrentUser(): Observable<any> {
    return this.http.get(`${this.baseUrl}users/`, { withCredentials: true });
  }

  // Обновление профиля пользователя
  updateProfile(userData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-CSRFToken': this.getCsrfTokenFromCookies(),
    });

    return this.http.put(`${this.baseUrl}update-profile/`, userData, {
      headers,
      withCredentials: true,
    });
  }

  // Установка роли пользователя в localStorage
  setRole(role: 'visitor' | 'student' | 'teacher'): void {
    localStorage.setItem(this.roleKey, role);
  }

  // Получение текущей роли из localStorage
  getRole(): 'visitor' | 'student' | 'teacher' {
    return (localStorage.getItem(this.roleKey) as 'visitor' | 'student' | 'teacher') || 'visitor';
  }

  // Проверка ролей
  isVisitor(): boolean {
    return this.getRole() === 'visitor';
  }

  isStudent(): boolean {
    return this.getRole() === 'student';
  }

  isTeacher(): boolean {
    return this.getRole() === 'teacher';
  }

  // Выход пользователя
  logout(): void {
    const headers = new HttpHeaders({
      'X-CSRFToken': this.getCsrfTokenFromCookies()  // Получаем CSRF токен из cookie
    });
  
    this.http.post(`${this.baseUrl}logout/`, {}, { headers, withCredentials: true })
      .subscribe(
        (response) => {
          console.log('Logout successful:', response);
          localStorage.removeItem('userData');
          localStorage.removeItem('userEmail');
        },
        (error) => {
          console.error('Logout failed:', error);
        }
      );
  }

  // Проверка аутентификации
  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.userKey);
  }
}
