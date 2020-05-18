import {FormGroup} from '@angular/forms';

export function PasswordValidator(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    if (matchingControl && matchingControl.errors && !matchingControl.errors.mustMatch) {
      return;
    }

    if (control && matchingControl) {
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({password_does_not_match: true});
      } else {
        matchingControl.setErrors(null);
      }
    }
  };
}

