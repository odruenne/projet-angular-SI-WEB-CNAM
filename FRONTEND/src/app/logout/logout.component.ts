import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Store } from '@ngxs/store';
import { ClearShoppingCart } from '../../store/actions/shoppingCart-action';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent implements OnInit {
  
  constructor(private authService: AuthService, private router: Router, private store: Store) {}

  ngOnInit(): void {
    this.authService.logout();
    this.store.dispatch(new ClearShoppingCart());
    this.router.navigate(["/**"]);
  }
}