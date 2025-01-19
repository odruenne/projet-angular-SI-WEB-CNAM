import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent implements OnInit {
  
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.logout();
    this.router.navigate(["/login"]);
  }
}