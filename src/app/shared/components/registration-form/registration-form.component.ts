import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html'
})
export class RegistrationFormComponent {
  submitted = false;
  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(6)]],
    email: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });

  constructor(private fb: FormBuilder) {}

  onSubmit() {
    this.submitted = true;
    if (this.form.valid) {
      // handle registration
    }
  }
}