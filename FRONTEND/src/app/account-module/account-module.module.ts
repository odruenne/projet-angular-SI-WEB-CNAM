import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountMenuComponent } from '../account-menu/account-menu.component';
import { AccountSecurityComponent } from '../account-security/account-security.component';
import { AccountWalletComponent } from '../account-wallet/account-wallet.component';
import { SharedModule } from '../shared-module/shared-module.module';

@NgModule({
  declarations: [
    AccountMenuComponent,
    AccountSecurityComponent,
    AccountWalletComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    AccountMenuComponent,
    AccountSecurityComponent,
    AccountWalletComponent
  ]
})
export class AccountModule { }
