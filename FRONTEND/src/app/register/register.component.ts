import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegisterDTO } from '../models/RegisterDTO';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MessageService } from '../services/message.service';
import { confirmPasswordValidator } from '../account-security/confirm-password.validator';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  createAccountForm: FormGroup;
  errorMessage: string | null = null;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router, private messageService : MessageService) {
    this.createAccountForm = this.formBuilder.group(
    {
      lastName: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      mailAddress: ['', [Validators.required, Validators.email]],
      postalAddress: ['', [Validators.required]],
      zipCode: ['', [Validators.required,Validators.pattern(/^\d{1,5}$/)]],
      city: ['', [Validators.required]],
      country: ['', [Validators.required]],
      login: ['',[Validators.required]],
      newPassword: [
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
    { validators: confirmPasswordValidator }
    );
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    this.errorMessage = null;

    if (this.createAccountForm.valid) {
      const registerDTO : RegisterDTO = {
        login: this.createAccountForm.value.login,
        password: this.createAccountForm.value.newPassword,
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
            "confirmInscription",`Merci ${registerDTO.login} pour votre inscription ! Vous pouvez désormais vous connecter !`
          );
          this.router.navigate(['/login']);
        },
        error: (err) => {
          if (err.error && err.error.message) {
            this.errorMessage = err.error.message;
          } else {
            this.errorMessage = "Une erreur s'est produite. Veuillez réessayer.";
          }
        }
      });
    }
  }
}
