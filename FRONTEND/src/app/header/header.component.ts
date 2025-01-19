import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngxs/store';
import { ShoppingCartState } from '../../store/states/shoppingCart-model';
import { Observable } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink,AsyncPipe,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  title: string = 'La boutique de Tokyo'
  private store = inject(Store);
  nbOfItems: Observable<number> = this.store.select(ShoppingCartState.getNbOfItems);
}