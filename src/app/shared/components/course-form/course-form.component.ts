import { Component } from '@angular/core';
import {
  FormBuilder, FormGroup,
  Validators
} from '@angular/forms';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent {
  submitted = false;
  form = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(2)]],
    description: ['', [Validators.required, Validators.minLength(2)]],
    duration: [0, [Validators.required, Validators.min(0)]],
    authors: this.fb.array([]),
    newAuthor: this.fb.group({
      name: ['', [Validators.minLength(2), Validators.pattern('^[a-zA-Z0-9]+$')]]
    })
  });

  constructor(private fb: FormBuilder) {}

  // Add logic for authors, add/delete, etc.
  onSubmit() {
    this.submitted = true;
    if (this.form.valid) {
      // handle course save
    }
  }
}