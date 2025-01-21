import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginFormComponent } from '../login-form/login-form.component';
import { LogoutComponent } from '../logout/logout.component';
import { RegisterComponent } from '../register/register.component';
import { AuthService } from '../services/auth.service';
import { AuthGuard } from '../auth.guard';
import { NoAuthGuard } from '../no-auth.guard';

@NgModule({
  declarations: [
    LoginFormComponent,
    LogoutComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    NoAuthGuard
  ],
  exports: [
    LoginFormComponent,
    LogoutComponent,
    RegisterComponent
  ]
})
export class AuthModule { }
