import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { KibblesService } from '../services/kibbles.service';
import { KibblesDTO } from '../models/KibblesDTO';
import { Store } from '@ngxs/store';
import { AddItemToShoppingCart } from '../../store/actions/shoppingCart-action';

@Component({
  selector: 'app-detail-kibble',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './details-kibbles.component.html',
  styleUrl: './details-kibbles.component.css'
})
export class DetailsKibblesComponent {

  kibbles: KibblesDTO;
  selectedMenu: 'description' | 'nutrition' = 'description'; 
  kibblesID: number;
  selectedQuantity: number = 1;
  totalPrice: number = 0;
 
  constructor(private route: ActivatedRoute, private kibblesService : KibblesService, private store: Store) {}

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
  }

  getDetailsFromKibbles(id: number) : void {
    this.kibblesService.getKibblesByID(id).subscribe({
      next: (kibblesData: KibblesDTO) => {
        this.kibbles = kibblesData;
        this.approvedByTokyo = kibblesData.approvedByTokyo;
        this.kibblesInStock = kibblesData.quantity >= 5;
        this.kibblesSoonOutOfStock = kibblesData.quantity < 5;
        this.kibblesOutOfStock = kibblesData.quantity === 0;
        this.updateTotalPrice();
      }
    });
  }

  increaseQuantity(): void {
    if (this.selectedQuantity < this.kibbles.quantity) {
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
      this.store.dispatch(new AddItemToShoppingCart(kibbleToAdd));
    }
  }
}
