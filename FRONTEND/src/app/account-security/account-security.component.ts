import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

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
    this.editPasswordForm = this.formBuilder.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['',[Validators.required]],
      confirmNewPassword: ['',[Validators.required]],
    });
  }

  // faire le onSubmit
  onSubmit(event: Event): void {
    console.log("ouaf");
  }
}
