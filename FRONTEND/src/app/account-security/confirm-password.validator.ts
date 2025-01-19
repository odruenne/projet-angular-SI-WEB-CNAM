import {
    AbstractControl,
    ValidationErrors,
    ValidatorFn,
} from '@angular/forms';
  
export const confirmPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    return control.value.newPassword === control.value.confirmNewPassword ? null : { PasswordNoMatch: true };
};