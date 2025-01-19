import { Injectable, Signal, signal } from '@angular/core';
import { CreditCard } from '../models/CreditCard';

@Injectable({
  providedIn: 'root'
})
export class CreditCardService {

private creditCards = signal<CreditCard[]>([]);
    
  constructor() { }

  getCreditCards() : Signal<CreditCard[]> {
    return this.creditCards.asReadonly();
  }

  addCreditCard(creditCard: CreditCard) {
    this.creditCards.update(creditCards => [...creditCards, creditCard]);
  }

  deleteCreditCard(index: number) {
    this.creditCards.update(creditCards => creditCards.filter((_, i) => i !== index));
  }
}