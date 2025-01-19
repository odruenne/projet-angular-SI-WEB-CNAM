import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngxs/store';
import { ShoppingCartState } from '../../store/states/shoppingCart-model';
import { Observable } from 'rxjs';
import { DecrementQuantityFromShoppingCart, IncrementQuantityFromShoppingCart } from '../../store/actions/shoppingCart-action';
import { KibblesDTO } from '../models/KibblesDTO';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css'
}) 
export class ShoppingCartComponent {
  private store = inject(Store);
  items$: Observable<KibblesDTO[]> = this.store.select(ShoppingCartState.getItemsFromShoppingCart);

  incrementQuantity(kibble: KibblesDTO) {
    this.store.dispatch(new IncrementQuantityFromShoppingCart(kibble));
  }

  decrementQuantity(kibble: KibblesDTO) {
    this.store.dispatch(new DecrementQuantityFromShoppingCart(kibble));
  }
}
