import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:4000/api';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get(`${API_URL}/courses/all`);
  }

  createCourse(course: any): Observable<any> { // TODO: replace 'any' with Course interface
    return this.http.post(`${API_URL}/courses`, course);
  }

  editCourse(id: string, course: any): Observable<any> {
    return this.http.put(`${API_URL}/courses/${id}`, course);
  }

  getCourse(id: string): Observable<any> {
    return this.http.get(`${API_URL}/courses/${id}`);
  }

  deleteCourse(id: string): Observable<any> {
    return this.http.delete(`${API_URL}/courses/${id}`);
  }

  filterCourses(value: string): Observable<any> {
    return this.http.get(`${API_URL}/courses/filter`, { params: { text: value } });
  }

  getAllAuthors(): Observable<any> {
    return this.http.get(`${API_URL}/authors/all`);
  }

  createAuthor(name: string): Observable<any> {
    return this.http.post(`${API_URL}/authors`, { name });
  }

  getAuthorById(id: string): Observable<any> {
    return this.http.get(`${API_URL}/authors/${id}`);
  }
}