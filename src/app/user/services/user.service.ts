import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:4000/api';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUser(): Observable<any> { // TODO: replace 'any' with User interface
    return this.http.get(`${API_URL}/users/me`);
  }
}