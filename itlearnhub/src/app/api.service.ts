import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://127.0.0.1:8000/';  // Базовый URL API

  constructor(private http: HttpClient) {}
  
  // Получение списка данных
  getCourses(): Observable<any> {
    return this.http.get(`${this.baseUrl}api/courses/`);
  }

  // Получение списка данных
  getCoursesforStudent(): Observable<any> {
    return this.http.get(`${this.baseUrl}my_enrolled_courses/`);
  }

  // Получение конкретного курса по ID
  getCourseById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}courses/${id}/`);
  }

  // Создание нового курса
  createCourse(courseData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}courses/`, courseData);
  }

  // Обновление курса
  updateCourse(id: number, courseData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}courses/${id}/`, courseData);
  }

  // Удаление курса
  deleteCourse(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}courses/${id}/`);
  }

}
