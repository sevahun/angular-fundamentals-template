import { Directive } from '@angular/core';
import {
  NG_VALIDATORS,
  Validator,
  AbstractControl,
  ValidationErrors,
  Validators,
} from '@angular/forms';

@Directive({
  selector: '[appEmailValidator]',
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
    const email = control.value;

    if (!email) {
      return { required: true };
    }

    // use Angular’s built-in email validator
    const result = Validators.email(control);

    // if invalid, return the error object directly
    if (result) {
      return result; // e.g. { email: true }
    }

    // valid → null
    return null;
  }
}