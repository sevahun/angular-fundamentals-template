import { Component, OnInit } from '@angular/core';
import {
  FormBuilder, FormGroup, FormArray, Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesStoreService } from '../../../services/courses-store.service';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent implements OnInit {
  form!: FormGroup;
  submitted = false;
  isEdit = false;
  courseId: string | null = null;

  get authors(): FormArray {
    return this.form.get('authors') as FormArray;
  }

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private coursesStore: CoursesStoreService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.required, Validators.minLength(2)]],
      duration: [0, [Validators.required, Validators.min(1)]],
      authors: this.fb.array([]),
      newAuthor: this.fb.group({
        name: ['', [Validators.minLength(2), Validators.pattern('^[a-zA-Z0-9 ]+$')]]
      })
    });

    this.courseId = this.route.snapshot.paramMap.get('id');
    if (this.courseId) {
      this.isEdit = true;
      this.coursesStore.getCourse(this.courseId).subscribe(course => {
        this.form.patchValue({
          title: course.title,
          description: course.description,
          duration: course.duration
        });
        course.authors.forEach((a: string) => this.authors.push(this.fb.control(a)));
      });
    }
  }

  addAuthor(): void {
    const name = this.form.value.newAuthor.name;
    if (name && name.trim()) {
      this.authors.push(this.fb.control(name));
      this.form.get('newAuthor')?.reset();
    }
  }

  removeAuthor(index: number): void {
    this.authors.removeAt(index);
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) return;

    const payload = {
      title: this.form.value.title,
      description: this.form.value.description,
      duration: this.form.value.duration,
      authors: this.form.value.authors
    };

    if (this.isEdit && this.courseId) {
      this.coursesStore.editCourse(this.courseId, payload);
    } else {
      this.coursesStore.createCourse(payload);
    }

    this.router.navigate(['/courses']);
  }
}