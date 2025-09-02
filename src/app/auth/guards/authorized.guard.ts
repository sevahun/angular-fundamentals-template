import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizedGuard implements CanLoad {
  constructor(private auth: AuthService, private router: Router) {}

  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree {
    if (this.auth.isAuthorised) {
      return true;
    }
    return this.router.parseUrl('/login');
  }
}