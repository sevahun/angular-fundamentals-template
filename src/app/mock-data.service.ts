import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MockDataService {
  private charactersLoader$ = new BehaviorSubject<boolean>(false);
  private planetLoader$ = new BehaviorSubject<boolean>(false);

  getCharacters(term?: string): Observable<any[]> {
    this.charactersLoader$.next(true);
    // Simulate API call
    setTimeout(() => this.charactersLoader$.next(false), 500);
    return of([{ name: 'Luke Skywalker' }, { name: 'Leia Organa' }]);
  }

  getPlanets(): Observable<any[]> {
    this.planetLoader$.next(true);
    // Simulate API call
    setTimeout(() => this.planetLoader$.next(false), 500);
    return of([{ name: 'Tatooine' }, { name: 'Alderaan' }]);
  }

  getCharactersLoader(): Observable<boolean> {
    return this.charactersLoader$.asObservable();
  }

  getPlanetLoader(): Observable<boolean> {
    return this.planetLoader$.asObservable();
  }
}