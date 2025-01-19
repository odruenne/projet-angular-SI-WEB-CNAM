import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreditCardFormFieldHighlightDirective } from '../credit-card-form-field-highlight.directive';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-account-wallet',
  standalone: true,
  imports: [ReactiveFormsModule, CreditCardFormFieldHighlightDirective, RouterLink],
  templateUrl: './account-wallet.component.html',
  styleUrl: './account-wallet.component.css'
})
export class AccountWalletComponent {
  creditCards: [];
  newCreditCardForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.newCreditCardForm = this.formBuilder.group({
      primaryAccountNumber: ['',[Validators.required, Validators.pattern('[0-9]+'), Validators.minLength(16), Validators.maxLength(16)]],
      name: ['', [Validators.required, Validators.maxLength(25),Validators.pattern('^[a-zA-Z ]*$')]],
      expirationDate: ['', [Validators.required, Validators.pattern('^(0[1-9]|1[0-2])\/\\d{2,4}$')]],
      cardValidationCode: ['',[Validators.required, Validators.maxLength(3),Validators.pattern('[0-9]+')]]
    });
  }

  onSubmit(event: Event) : void {
    // TO DO
    console.log("patoune");
  }

}
