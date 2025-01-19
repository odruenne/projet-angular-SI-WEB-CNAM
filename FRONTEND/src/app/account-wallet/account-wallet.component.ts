import { Component, OnInit, Signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormFieldHighlightDirective } from '../form-field-highlight.directive';
import { RouterLink } from '@angular/router';
import { CreditCardService } from '../services/creditCard.service';
import { CreditCard } from '../models/CreditCard';
import { CommonModule } from '@angular/common';
import { TransformToAsteriskPipe } from './transformToAsteriskPipe';

@Component({
  selector: 'app-account-wallet',
  standalone: true,
  imports: [ReactiveFormsModule, FormFieldHighlightDirective, RouterLink, CommonModule, TransformToAsteriskPipe],
  templateUrl: './account-wallet.component.html',
  styleUrl: './account-wallet.component.css'
})
export class AccountWalletComponent implements OnInit {
  creditCards: Signal<CreditCard[]>;
  newCreditCardForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private creditCardService: CreditCardService) {
    this.newCreditCardForm = this.formBuilder.group({
      primaryAccountNumber: ['',[Validators.required, Validators.pattern('[0-9]+'), Validators.minLength(16), Validators.maxLength(16)]],
      name: ['', [Validators.required, Validators.maxLength(25),Validators.pattern('^[a-zA-Z ]*$')]],
      expirationDate: ['', [Validators.required, Validators.pattern('^(0[1-9]|1[0-2])\/\\d{2,4}$')]],
      cardValidationCode: ['',[Validators.required, Validators.maxLength(3),Validators.pattern('[0-9]+')]]
    });
  }

  ngOnInit() {
    this.creditCards = this.creditCardService.getCreditCards();
  }


  onSubmit(event: Event) : void {
    event.preventDefault();
    if (this.newCreditCardForm.valid) {
      const newCreditCard: CreditCard = {
        primaryAccountNumber : this.newCreditCardForm.value.primaryAccountNumber,
        name: this.newCreditCardForm.value.name,
        expirationDate: this.newCreditCardForm.value.expirationDate,
        cardValidationCode: this.newCreditCardForm.value.cardValidationCode
      };

      this.creditCardService.addCreditCard(newCreditCard);
      this.newCreditCardForm.clearValidators(); 
      this.newCreditCardForm.updateValueAndValidity();
      this.newCreditCardForm.reset();
      
    }
  }

  onDeleteCreditCard(index: number) {
    this.creditCardService.deleteCreditCard(index);
  }

}
