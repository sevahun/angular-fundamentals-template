import { Component, OnDestroy } from '@angular/core';
import { Subject, Observable, forkJoin, combineLatest } from 'rxjs';
import { debounceTime, filter, switchMap, map, takeUntil } from 'rxjs/operators';
// Assume mockDataService is available in the context
import { MockDataService } from './mock-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  searchTermByCharacters = new Subject<string>();
  characters$: Observable<any>;
  planetAndCharactersResults$!: Observable<any>;
  isLoading = false;
  private destroy$ = new Subject<void>();

  constructor(private mockDataService: MockDataService) {
    // 1, 2, 3: Input handler, filter, debounce, API call
    this.characters$ = this.searchTermByCharacters.pipe(
      debounceTime(300),
      filter(term => term.length >= 3),
      switchMap(term => this.mockDataService.getCharacters(term))
    );

    // 5a: Loader logic
    combineLatest([
      this.mockDataService.getCharactersLoader(),
      this.mockDataService.getPlanetLoader()
    ])
    .pipe(
      map(([charLoader, planetLoader]) => this.areAllValuesTrue([charLoader, planetLoader])),
      takeUntil(this.destroy$)
    )
    .subscribe(isLoading => {
      this.isLoading = isLoading;
    });
  }

  // 1: Input handler method
  changeCharactersInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchTermByCharacters.next(value);
  }

  // 4: Load Characters and Planets, combine results
  loadCharactersAndPlanets() {
    this.planetAndCharactersResults$ = forkJoin([
      this.mockDataService.getCharacters(),
      this.mockDataService.getPlanets()
    ]).pipe(
      map(([characters, planets]) => [
        ...((characters ?? []).map((c: any) => c.name)),
        ...((planets ?? []).map((p: any) => p.name))
      ])
    );
  }

  // 5a: Helper function for loader logic
  areAllValuesTrue(values: boolean[]): boolean {
    return values.some(v => v);
  }

  // 5b: Unsubscribe from all subscriptions
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}