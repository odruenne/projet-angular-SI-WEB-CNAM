import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngxs/store';
import { ShoppingCartState } from '../../store/states/shoppingCart-model';
import { Kibbles } from '../../store/models/kibbles';
import { Observable } from 'rxjs';
import { DecrementQuantityFromShoppingCart, IncrementQuantityFromShoppingCart } from '../../store/actions/shoppingCart-action';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css'
}) 
export class ShoppingCartComponent {
  private store = inject(Store);
  items$: Observable<Kibbles[]> = this.store.select(ShoppingCartState.getItemsFromShoppingCart);

  incrementQuantity(kibble: Kibbles) {
    this.store.dispatch(new IncrementQuantityFromShoppingCart(kibble));
  }

  decrementQuantity(kibble: Kibbles) {
    this.store.dispatch(new DecrementQuantityFromShoppingCart(kibble));
  }
}
