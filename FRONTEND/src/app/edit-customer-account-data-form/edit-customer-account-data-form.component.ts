import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccountService } from '../services/account.service';
import { UserDTO } from '../models/UserDTO';
import { Router, RouterLink } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MessageService } from '../services/message.service';
import { UpdateUserDTO } from '../models/UpdateUserDTO';
import { CommonModule } from '@angular/common';
import { FormFieldHighlightDirective } from '../form-field-highlight.directive';
import { Store } from '@ngxs/store';
import { ClearShoppingCart } from '../../store/actions/shoppingCart-action';

@Component({
  selector: 'app-edit-customer-account-data-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule, FormFieldHighlightDirective],
  providers: [JwtHelperService],
  templateUrl: './edit-customer-account-data-form.component.html',
  styleUrls: ['./edit-customer-account-data-form.component.css'],
})
export class EditCustomerAccountDataFormComponent implements OnInit {
  updateAccountDataForm: FormGroup;
  dataUpdated: boolean = false;
  dataUpdatedMessage: string = "Vos données ont été modifées !";
  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private router: Router,
    private messageService: MessageService,
    private store: Store
  ) {
    this.updateAccountDataForm = this.formBuilder.group({
      lastName: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      mailAddress: ['', [Validators.required, Validators.email]],
      postalAddress: ['', [Validators.required]],
      zipCode: ['', [Validators.required, Validators.pattern(/^\d{1,5}$/)]],
      city: ['', [Validators.required]],
      country: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
   this.getData();
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
      const updatedUserData = {
        lastName: this.updateAccountDataForm.value.lastName,
        firstName: this.updateAccountDataForm.value.firstName,
        mailAddress: this.updateAccountDataForm.value.mailAddress,
        postalAddress: this.updateAccountDataForm.value.postalAddress,
        zipCode: this.updateAccountDataForm.value.zipCode,
        city: this.updateAccountDataForm.value.city,
        country: this.updateAccountDataForm.value.country,
      };
    
      this.accountService.updateUserData(updatedUserData).subscribe({
        next: (updatedData: UpdateUserDTO) => {
          this.updateAccountDataForm.patchValue(updatedData);
          this.dataUpdated = true;
          this.router.navigate(["/account-profile"]);

        },
        error: (error) => {
          console.error('Erreur lors de la mise à jour :', error);
        },
      });
    }
  }

  onDeleteAccount() : void {
    this.accountService.deleteUserAccount().subscribe({
      next: () => {
        this.store.dispatch(new ClearShoppingCart());
        this.messageService.setMessage(
          "confirmationSuppression",`Votre compte a bien été supprimé ! Nous espérons vous revoir bientôt sur notre site !`
        );
        this.router.navigate(['/**']);
      },
      error: (err) => console.log('error : ', err),
    });
  }
}