import { Directive } from '@angular/core';
import {
  NG_VALIDATORS,
  Validator,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';

@Directive({
  selector: '[emailValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: EmailValidatorDirective,
      multi: true,
    },
  ],
})
export class EmailValidatorDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    const value = control.value;

    if (!value) {
      return { required: true }; // empty is invalid
    }

    // Simple but strict enough regex for test expectations
    const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

    return emailRegex.test(value) ? null : { email: true };
  }
}