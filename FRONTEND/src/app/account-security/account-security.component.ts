import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { AccountService } from '../services/account.service';
import { UpdatePasswordDTO } from '../models/UpdatePasswordDTO';
import { MessageService } from '../services/message.service';
import { Router, RouterLink } from '@angular/router';
import { confirmPasswordValidator } from './confirm-password.validator';
import { CommonModule } from '@angular/common';
import { FormFieldHighlightDirective } from '../form-field-highlight.directive';

@Component({
  selector: 'app-account-security',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule, FormFieldHighlightDirective],
  templateUrl: './account-security.component.html',
  styleUrl: './account-security.component.css'
})
export class AccountSecurityComponent {
  editPasswordForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private accountService: AccountService, private messageService : MessageService, private router: Router) {
    this.editPasswordForm = this.formBuilder.group(
      {
        currentPassword: ['', [Validators.required]],
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
        confirmNewPassword: ['', [Validators.required, Validators.minLength(12),Validators.pattern('^(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\\d!@#$%^&*(),.?":{}|<>]{12,}$')]],
      },
      { validators: [confirmPasswordValidator, this.newPasswordCannotMatchCurrentPassword] }
    );
  }

  onSubmit(event: Event): void {
    event.preventDefault();

    if (this.editPasswordForm.valid) {
      const updatedPasswordUser: UpdatePasswordDTO = {
        currentPassword: this.editPasswordForm.value.currentPassword, 
        password: this.editPasswordForm.value.newPassword,
      };
  
      this.accountService.updateUserPassword(updatedPasswordUser).subscribe({
        next: () => {
          this.messageService.setMessage('Votre mot de passe a bien été modifié !');
          this.router.navigate(['/account-security']);
        },
        error: (error) => {
          if (error.status === 400) {
            this.messageService.setMessage(error.error.message);
          } else {
            console.error('Erreur serveur : ', error);
          }
        },
      });
    }
  }
  

  newPasswordCannotMatchCurrentPassword(control: AbstractControl): ValidationErrors | null {
    const currentPassword = control.get('currentPassword')?.value;
    const newPassword = control.get('newPassword')?.value;
  
    if (currentPassword && newPassword && currentPassword === newPassword) {
      return { samePassword: true };
    }
    return null;
  }
}
