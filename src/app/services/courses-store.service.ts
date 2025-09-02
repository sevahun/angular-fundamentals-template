import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap, finalize } from 'rxjs';
import { CoursesService } from './courses.service';

@Injectable({
  providedIn: 'root'
})
export class CoursesStoreService {
  private isLoading$$ = new BehaviorSubject<boolean>(false);
  private courses$$ = new BehaviorSubject<any[]>([]); // TODO: replace 'any' with Course[]

  public isLoading$: Observable<boolean> = this.isLoading$$.asObservable();
  public courses$: Observable<any[]> = this.courses$$.asObservable();

  constructor(private coursesService: CoursesService) {}

  getAll() {
    this.isLoading$$.next(true);
    this.coursesService.getAll()
      .pipe(finalize(() => this.isLoading$$.next(false)))
      .subscribe(courses => this.courses$$.next(courses));
  }

  createCourse(course: any) {
    return this.coursesService.createCourse(course).pipe(
      tap(newCourse => {
        const current = this.courses$$.value;
        this.courses$$.next([...current, newCourse]);
      })
    );
  }

  getCourse(id: string) {
    return this.coursesService.getCourse(id);
  }

  editCourse(id: string, course: any) {
    return this.coursesService.editCourse(id, course).pipe(
      tap(updatedCourse => {
        const updatedList = this.courses$$.value.map(c =>
          c.id === id ? updatedCourse : c
        );
        this.courses$$.next(updatedList);
      })
    );
  }

  deleteCourse(id: string) {
    return this.coursesService.deleteCourse(id).pipe(
      tap(() => {
        const updatedList = this.courses$$.value.filter(c => c.id !== id);
        this.courses$$.next(updatedList);
      })
    );
  }

  filterCourses(value: string) {
    this.isLoading$$.next(true);
    this.coursesService.filterCourses(value)
      .pipe(finalize(() => this.isLoading$$.next(false)))
      .subscribe(courses => this.courses$$.next(courses));
  }

  getAllAuthors() {
    return this.coursesService.getAllAuthors();
  }

  createAuthor(name: string) {
    return this.coursesService.createAuthor(name);
  }

  getAuthorById(id: string) {
    return this.coursesService.getAuthorById(id);
  }
}