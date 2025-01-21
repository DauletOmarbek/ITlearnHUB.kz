import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CsrfService {
  constructor(private http: HttpClient) {}

  // Метод для получения CSRF токена с сервера Django
  getCsrfToken() {
    return this.http.get('http://127.0.0.1:8000/api/csrf/', { withCredentials: true });
  }
}
