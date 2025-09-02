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

    const result = Validators.email(control);

    // Angular returns null (valid) or { email: true } (invalid)
    return result ? { email: true } : null;
  }
}