import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-account-security',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './account-security.component.html',
  styleUrl: './account-security.component.css'
})
export class AccountSecurityComponent {
  editPasswordForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.editPasswordForm = this.formBuilder.group(
      {
        currentPassword: ['', [Validators.required]],
        newPassword: [
          '',
          [
            Validators.required,
            Validators.minLength(12), 
            Validators.pattern('^(?=.*[A-Z])'), 
            Validators.pattern('^(?=(?:.*\\d){0,1})'), 
            Validators.pattern('^(?=(?:.*[!@#$%^&*(),.?":{}|<>]){0,1})'), 
          ]
        ],
        confirmNewPassword: ['', [Validators.required]],
      },
      { validators: this.matchPasswords('newPassword', 'confirmNewPassword') }
    );
  }

  matchPasswords(passwordKey: string, confirmPasswordKey: string) {
    return (group: AbstractControl): ValidationErrors | null => {
      const password = group.get(passwordKey)?.value;
      const confirmPassword = group.get(confirmPasswordKey)?.value;

      if (password !== confirmPassword) {
        return { passwordsNotMatching: true };
      }

      return null;
    };
  }

  // faire le onSubmit
  onSubmit(event: Event): void {
    console.log("ouaf");
  }
}
