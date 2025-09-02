import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CoursesStoreService } from '../../services/courses-store.service';
import { UserStoreService } from '@app/user/services/user-store.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  courses$ = this.coursesStore.courses$;
  isAdmin$ = this.userStore.isAdmin$;

  constructor(
    private coursesStore: CoursesStoreService,
    private userStore: UserStoreService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.coursesStore.getAll();
  }

  onSearch(value: string): void {
    if (value.trim()) {
      this.coursesStore.filterCourses(value);
    } else {
      this.coursesStore.getAll();
    }
  }

  addCourse(): void {
    this.router.navigate(['/courses/add']);
  }

  showCourse(id: string): void {
    this.router.navigate([`/courses/${id}`]);
  }

  editCourse(id: string): void {
    this.router.navigate([`/courses/edit/${id}`]);
  }

  deleteCourse(id: string): void {
    this.coursesStore.deleteCourse(id);
  }
}