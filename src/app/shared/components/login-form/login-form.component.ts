import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  @ViewChild('loginForm') public loginForm!: NgForm;

  email = '';
  password = '';
  submitted = false;

  onSubmit(form: NgForm) {
    this.submitted = true;
    if (form.valid) {
      // handle login logic here
    }
  }
}