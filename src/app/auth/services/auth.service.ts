import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { SessionStorageService } from './session-storage.service';

interface LoginPayload {
  email: string;
  password: string;
}

interface RegisterPayload {
  email: string;
  password: string;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = 'http://localhost:4000/api';
  private isAuthorized$$ = new BehaviorSubject<boolean>(!!this.sessionStorage.getToken());
  public isAuthorized$ = this.isAuthorized$$.asObservable();

  constructor(
    private http: HttpClient,
    private sessionStorage: SessionStorageService,
    private router: Router
  ) {}

  login(user: LoginPayload): Observable<any> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, user).pipe(
      tap(res => {
        this.sessionStorage.setToken(res.token);
        this.isAuthorised = true;
      })
    );
  }

  logout(): void {
    this.sessionStorage.deleteToken();
    this.isAuthorised = false;
    this.router.navigate(['/login']);
  }

  register(user: RegisterPayload): Observable<any> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/register`, user).pipe(
      tap(res => {
        this.sessionStorage.setToken(res.token);
        this.isAuthorised = true;
      })
    );
  }

  get isAuthorised(): boolean {
    return this.isAuthorized$$.value;
  }

  set isAuthorised(value: boolean) {
    this.isAuthorized$$.next(value);
  }

  getLoginUrl(): string {
    return '/login';
  }
}