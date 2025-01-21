import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountService } from '../services/account.service';
import { AuthService } from '../services/auth.service';
import { CreditCardService } from '../services/creditCard.service';
import { MessageService } from '../services/message.service';
import { AuthGuard } from '../auth.guard';
import { NoAuthGuard } from '../no-auth.guard';
import { JwtInterceptor } from '../jwt-interceptor';

@NgModule({
  imports: [CommonModule],
  providers: [
    AccountService,
    AuthService,
    CreditCardService,
    MessageService,
    AuthGuard,
    NoAuthGuard,
    JwtInterceptor
  ]
})
export class CoreModule { }
