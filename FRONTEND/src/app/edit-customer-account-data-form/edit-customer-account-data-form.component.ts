import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccountService } from '../services/account.service';
import { UserDTO } from '../models/UserDTO';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-edit-customer-account-data-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  providers: [JwtHelperService],
  templateUrl: './edit-customer-account-data-form.component.html',
  styleUrls: ['./edit-customer-account-data-form.component.css'],
})
export class EditCustomerAccountDataFormComponent implements OnInit {
  updateAccountDataForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private router: Router,
    private authService: AuthService
  ) {
    this.updateAccountDataForm = this.formBuilder.group({
      lastName: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      mailAddress: ['', [Validators.required, Validators.email]],
      postalAddress: ['', [Validators.required]],
      zipCode: ['', [Validators.required]],
      city: ['', [Validators.required]],
      country: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      this.updateAccountDataForm.patchValue(userData);
    } else {
      this.getData();
    }
  }

  getData(): void {
    this.accountService.getDataFromUser().subscribe({
      next: (userData: UserDTO) => {
        if (userData) {
          this.updateAccountDataForm.patchValue({
            lastName: userData.lastName,
            firstName: userData.firstName,
            mailAddress: userData.mailAddress,
            postalAddress: userData.postalAddress,
            zipCode: userData.zipCode,
            city: userData.city,
            country: userData.country
          });
        } 
      },
      error: (err) => {
        if (err.status === 401) {
          this.router.navigate(['/login']);
        }
      },
    });
  }
  
  onSubmit(event: Event): void {
    
    event.preventDefault();
    if (this.updateAccountDataForm.valid) {
      const updatedUserData: UserDTO = this.updateAccountDataForm.value;
      this.accountService.updateUserData(updatedUserData).subscribe({
        next: (updatedData: UserDTO) => {
          localStorage.setItem('userData', JSON.stringify(updatedData));
          this.updateAccountDataForm.patchValue(updatedData); 
        },
        error: (error) => {
          console.error('Error :', error);
        },
      });
    }
  }
}