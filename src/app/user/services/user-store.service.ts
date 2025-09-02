import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {
  private name$$ = new BehaviorSubject<string | null>(null);
  private isAdmin$$ = new BehaviorSubject<boolean>(false);

  public name$: Observable<string | null> = this.name$$.asObservable();
  public isAdmin$: Observable<boolean> = this.isAdmin$$.asObservable();

  constructor(private userService: UserService) {}

  getUser() {
    return this.userService.getUser().pipe(
      tap(user => {
        this.name$$.next(user?.name || null);
        this.isAdmin$$.next(user?.role === 'admin');
      })
    );
  }

  get isAdmin(): boolean {
    return this.isAdmin$$.value;
  }

  set isAdmin(value: boolean) {
    this.isAdmin$$.next(value);
  }
}