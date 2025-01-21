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
    console.log("title : ", title);
    console.log("msg : ", message);
    if (title === "confirmInscription") {
      this.welcomeMessage = message;
      this.showWelcomeMessage = true;
    
    }
  }

  onSubmit(event: Event): void {
    console.log('onSubmit appelé');
    this.errorMessage = null;
    this.welcomeMessage = null;
    event.preventDefault();
    console.log("valid ? ", this.connectionForm.valid);
  
    if (this.connectionForm.valid) {
      const loginDTO: LoginDTO = {
        login: this.connectionForm.value.login,
        password: this.connectionForm.value.password,
      };

      console.log("loginDTO : ", loginDTO);
  
      this.authService.login(loginDTO).subscribe({
        next: (res) => {
          console.log("Réponse du serveur : ", res);
          this.router.navigate(['/catalog']);
        },
        error: (err) => {
          console.log("err : ", err);
          if (err.status === 401) {
            console.log("MIAOU");
          }
          console.log("Erreur dans la réponse : ", err);
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
