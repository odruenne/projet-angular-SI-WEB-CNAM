import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { KibblesService } from '../services/kibbles.service';
import { KibblesDTO } from '../models/KibblesDTO';
import { Store } from '@ngxs/store';
import { AddItemToShoppingCart, IncrementQuantityFromShoppingCart } from '../../store/actions/shoppingCart-action';
import { Observable } from 'rxjs';
import { ShoppingCartState } from '../../store/states/shoppingCart-model';

@Component({
  selector: 'app-detail-kibble',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './details-kibbles.component.html',
  styleUrl: './details-kibbles.component.css'
})
export class DetailsKibblesComponent implements OnInit {
  private store = inject(Store);
  kibbles: KibblesDTO;
  selectedMenu: 'description' | 'nutrition' = 'description'; 
  kibblesID: number;
  selectedQuantity: number = 1;
  totalPrice: number = 0;
  quantityInShoppingCart: number = 0;
  items$: Observable<KibblesDTO[]> = this.store.select(ShoppingCartState.getItemsFromShoppingCart);
  itemsStoredInShoppingCart : KibblesDTO[] = [];
  isOutOfStock: boolean = false;


  constructor(private route: ActivatedRoute, private kibblesService : KibblesService) {
  
  }

  showNutrition: boolean = false;
  showDescription: boolean = true;
  approvedByTokyo: boolean;
  kibblesInStock: boolean;
  kibblesSoonOutOfStock: boolean;
  kibblesOutOfStock: boolean;

  toggleDescription() {
    this.showNutrition = !this.showNutrition;
    this.showDescription = !this.showDescription;
    this.selectedMenu = 'description'; 
  }

  toggleNutrition() {
    this.showNutrition = !this.showNutrition;
    this.showDescription = !this.showDescription;
    this.selectedMenu = 'nutrition'; 
  }

  ngOnInit(): void {
    this.kibblesID = Number(this.route.snapshot.paramMap.get('id'));
    this.getDetailsFromKibbles(this.kibblesID);
  
    this.items$.subscribe((data) => {
      this.itemsStoredInShoppingCart = data;
      const existingItem = this.itemsStoredInShoppingCart.find(item => item.id === this.kibblesID);
  
      if (existingItem) {
        this.quantityInShoppingCart = existingItem.quantity;
      } else {
        this.quantityInShoppingCart = 0;
      }
    });
  }
  

  getDetailsFromKibbles(id: number): void {
    this.kibblesService.getKibblesByID(id).subscribe({
      next: (kibblesData: KibblesDTO) => {
        this.kibbles = kibblesData;
  
        const existingItem = this.itemsStoredInShoppingCart.find(item => item.id === kibblesData.id);
        this.quantityInShoppingCart = existingItem ? existingItem.quantity : 0;
  
        this.kibblesInStock = kibblesData.quantity > this.quantityInShoppingCart;
        this.kibblesSoonOutOfStock = kibblesData.quantity - this.quantityInShoppingCart < 5;
        this.kibblesOutOfStock = kibblesData.quantity - this.quantityInShoppingCart === 0;
  
        this.updateTotalPrice();
      },
    });
  }
  
  increaseQuantity(): void {
    const maxAvailableQuantity = this.kibbles.quantity - this.quantityInShoppingCart;
    
    if (this.selectedQuantity < maxAvailableQuantity) {
      this.selectedQuantity++;
      this.updateTotalPrice();
    }
  }
  

  decreaseQuantity(): void {
    if (this.selectedQuantity > 1) {
      this.selectedQuantity--;
      this.updateTotalPrice();
    }
  }

  updateTotalPrice(): void {
    this.totalPrice = this.selectedQuantity * this.kibbles.price;
  }


  addItemToCart(): void {
      
    if (this.selectedQuantity <= this.kibbles.quantity) {
      const kibbleToAdd = {
        ...this.kibbles,
        quantity: this.selectedQuantity,
        totalPrice: this.totalPrice,
      };
  
      const existingItem = this.itemsStoredInShoppingCart.find(item => item.id === kibbleToAdd.id);
  
      if (existingItem) {
        const totalQuantityInCart = existingItem.quantity + this.selectedQuantity;
  
        if (totalQuantityInCart <= this.kibbles.quantity) {
          this.store.dispatch(new IncrementQuantityFromShoppingCart({ 
            ...existingItem, 
            quantity: totalQuantityInCart 
          }));
        } else {
          this.isOutOfStock = true;
        }
      } else {
        this.store.dispatch(new AddItemToShoppingCart(kibbleToAdd));
      }
    } else {
      this.isOutOfStock = true;
    }
  }
  
  
  
}
