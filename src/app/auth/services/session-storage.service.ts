import { Injectable, Inject } from '@angular/core';

const TOKEN = 'SESSION_TOKEN';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {
  constructor(@Inject(Window) private window: Window) {}

  setToken(token: string) {
    this.window.sessionStorage.setItem(TOKEN, token);
  }

  getToken(): string | null {
    return this.window.sessionStorage.getItem(TOKEN);
  }

  deleteToken() {
    this.window.sessionStorage.removeItem(TOKEN);
  }
}