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
export class LoginFormComponent {
  connectionForm: FormGroup;
  errorMessage: string | null = null;
  showErrorMessage: boolean = false;
  welcomeMessage: string | null = null;
  showWelcomeMessage: boolean = false;
  
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private messageService : MessageService
  ) {
    this.connectionForm = this.formBuilder.group({
      login: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });

    let { title, message } = this.messageService.getMessage();
    if (title === "confirmInscription") {
      this.welcomeMessage = message;
      this.showWelcomeMessage = true;
    
    }
  }

  onSubmit(event: Event): void {
    this.errorMessage = null;
    this.welcomeMessage = null;
    event.preventDefault();
  
    if (this.connectionForm.valid) {
      const loginDTO: LoginDTO = {
        login: this.connectionForm.value.login,
        password: this.connectionForm.value.password,
      };

  
      this.authService.login(loginDTO).subscribe({
        next: (res) => {
          this.router.navigate(['/catalog']);
        },
        error: (err) => {
          if (err.status === 401) {
          }
          let { title, message } = this.messageService.getMessage();
          if (title === "formInvalide") {
            this.errorMessage = message;
            this.showErrorMessage = true;
          
          }
          this.connectionForm.reset();
        }
      });
    }
  }
}
