import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  createAccountForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.createAccountForm = this.formBuilder.group({
      lastName: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      mailAddress: ['', [Validators.required, Validators.email]],
      postalAddress: ['', [Validators.required]],
      zipCode: ['', [Validators.required]],
      city: ['', [Validators.required]],
      country: ['', [Validators.required]],
      login: ['',[Validators.required]],
      password: ['',[Validators.required]],
      confirmNewPassword: ['',[Validators.required]],
    });
  }

  onSubmit(event: Event): void {
    // TO DO 
    console.log("mweeeeeeeeeeeeee");
  }
}
