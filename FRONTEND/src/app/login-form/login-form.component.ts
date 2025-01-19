import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginDTO } from '../models/LoginDTO';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})


export class LoginFormComponent implements OnInit {
  connectionForm: FormGroup;
  showErrorMessage : boolean = false;
  welcomeMessage: string | null = null;
  
  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router, private messageService : MessageService) {
    this.connectionForm = this.formBuilder.group({
      login: ['',[Validators.required]],
      password: ['',[Validators.required]]
    });

  }
  ngOnInit(): void {
    this.welcomeMessage = this.messageService.getMessage();
    if (this.welcomeMessage != null) {
      this.showErrorMessage = true;
    }
  }

  onSubmit(event: Event) : void {
    this.showErrorMessage = false;
    event.preventDefault();
    if (this.connectionForm.valid) {
      const loginDTO : LoginDTO = { 
        login: this.connectionForm.value.login,
        password: this.connectionForm.value.password,
      };

      this.authService.login(loginDTO).subscribe(
      {
        next: () => this.router.navigate(['/catalog']),
        error: _ => {
          this.showErrorMessage = true;
          this.connectionForm.reset();
        }
      }
      );
    }
  }
}