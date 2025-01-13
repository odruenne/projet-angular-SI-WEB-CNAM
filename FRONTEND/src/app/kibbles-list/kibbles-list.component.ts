import { Component, OnInit } from '@angular/core';
import { KibblesService } from '../services/kibbles.service';
import { Kibbles } from '../../store/models/kibbles';
import { CommonModule } from '@angular/common';
import { Store } from '@ngxs/store';
import { AddItemToShoppingCart } from '../../store/actions/shoppingCart-action';
import { AuthService } from '../services/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './kibbles-list.component.html',
  styleUrls: ['./kibbles-list.component.css'],
})
export class KibblesList implements OnInit {
  approvedByTokyo: boolean = true;
  kibbles: Kibbles[];

  constructor(private kibblesService : KibblesService, private store: Store, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.kibblesService.kibblesObservable.subscribe(res => this.kibbles = res);
    this.getKibbles();
  }

  getKibbles() : void {
    this.kibblesService.getKibbles('', Infinity);
  }

  addItemToCart(kibble: Kibbles) {
    this.store.dispatch(new AddItemToShoppingCart(kibble));
  }
}