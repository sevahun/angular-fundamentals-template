import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, Observable, forkJoin, combineLatest, Subscription } from 'rxjs';
import { debounceTime, filter, switchMap, map, takeUntil } from 'rxjs/operators';
import { MockDataService } from './mock-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  searchTermByCharacters = new Subject<string>();
  characters$: Observable<any> | undefined;
  planetAndCharactersResults$!: Observable<any>;
  isLoading = false;
  subscriptions: Subscription[] = [];

  constructor(private mockDataService: MockDataService) {}

  ngOnInit() {
    // 1, 2, 3: Input handler, filter, debounce, API call
    this.characters$ = this.searchTermByCharacters.pipe(
      debounceTime(300),
      filter(term => term.length >= 3),
      switchMap(term => this.mockDataService.getCharacters(term))
    );

    // 5a: Loader logic
    this.initLoadingState();
  }

  // 1: Input handler method (compatible with tests)
  changeCharactersInput(event: any) {
    // Accepts both real Event and mock objects for testing
    let value = '';
    if (event && event.target && typeof event.target.value === 'string') {
      value = event.target.value;
    }
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

  // 5a: Loader logic as a public method for tests
  initLoadingState() {
    const sub = combineLatest([
      this.mockDataService.getCharactersLoader(),
      this.mockDataService.getPlanetLoader()
    ])
    .pipe(
      map(([charLoader, planetLoader]) => this.areAllValuesTrue([charLoader, planetLoader]))
    )
    .subscribe(isLoading => {
      this.isLoading = isLoading;
    });
    this.subscriptions.push(sub);
  }

  // 5a: Helper function for loader logic
  areAllValuesTrue(values: boolean[]): boolean {
    return values.some(v => v);
  }

  // 5b: Unsubscribe from all subscriptions
  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}