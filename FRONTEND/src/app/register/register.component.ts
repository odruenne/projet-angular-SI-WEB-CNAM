import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { RegisterDTO } from '../models/RegisterDTO';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  createAccountForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router, private messageService : MessageService) {
    this.createAccountForm = this.formBuilder.group(
    {
      lastName: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      mailAddress: ['', [Validators.required, Validators.email]],
      postalAddress: ['', [Validators.required]],
      zipCode: ['', [Validators.required]],
      city: ['', [Validators.required]],
      country: ['', [Validators.required]],
      login: ['',[Validators.required]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(12),
          Validators.pattern(
            '^(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\\d!@#$%^&*(),.?":{}|<>]{12,}$'
          )
        ]
      ],
      confirmNewPassword: ['', [Validators.required]],
    },
    // { validators: this.matchPasswords('newPassword', 'confirmNewPassword') }
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

  onSubmit(event: Event): void {
    event.preventDefault();
    if (this.createAccountForm.valid) {
      const registerDTO : RegisterDTO = {
        login: this.createAccountForm.value.login,
        password: this.createAccountForm.value.password,
        lastName: this.createAccountForm.value.lastName,
        firstName: this.createAccountForm.value.firstName,
        mailAddress: this.createAccountForm.value.mailAddress,
        postalAddress: this.createAccountForm.value.postalAddress,
        zipCode: this.createAccountForm.value.zipCode,
        city: this.createAccountForm.value.city,
        country: this.createAccountForm.value.country,
      };

      this.authService.register(registerDTO).subscribe({
        next: () => {
          this.messageService.setMessage(
            `Merci ${registerDTO.login} pour votre inscription ! Vous pouvez désormais vous connecter !`
          );
          this.router.navigate(['/login']);
        },
        error: (err) => console.log('error : ', err),
      });
    }
  }
}
