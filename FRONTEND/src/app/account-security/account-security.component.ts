import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { AccountService } from '../services/account.service';
import { UserDTO } from '../models/UserDTO';
import { UpdatePasswordDTO } from '../models/UpdatePasswordDTO';
import { MessageService } from '../services/message.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-account-security',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
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
        confirmNewPassword: ['', [Validators.required]],
      },
      // { validators: this.matchPasswords('newPassword', 'confirmNewPassword') }
    );
  }

  // matchPasswords(passwordKey: string, confirmPasswordKey: string) {
  //   return (group: AbstractControl): ValidationErrors | null => {
  //     const password = group.get(passwordKey)?.value;
  //     const confirmPassword = group.get(confirmPasswordKey)?.value;

  //     if (password !== confirmPassword) {
  //       return { passwordsNotMatching: true };
  //     }

  //     return null;
  //   };
  // }

  onSubmit(event: Event): void {
    event.preventDefault();
    if (this.editPasswordForm.valid) {
      const updatedPasswordUser: UpdatePasswordDTO = {
        password: this.editPasswordForm.value.newPassword,
      };
      

      this.accountService.updateUserPassword(updatedPasswordUser).subscribe({
        next: (updatedUser: UserDTO) => {
          this.messageService.setMessage(
            `Votre mot de passe a bien été modifié ! `
          );
          this.router.navigate(['/account-security']);
        },
        error: (error) => {
          console.error('Erreur lors du changement du mot de passe : ', error);
        },
      });
    }
  }
}
