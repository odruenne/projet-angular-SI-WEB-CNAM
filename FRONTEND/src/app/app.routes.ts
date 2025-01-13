import { Routes } from '@angular/router';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { EditCustomerAccountDataFormComponent } from './edit-customer-account-data-form/edit-customer-account-data-form.component';
import { LogoutComponent } from './logout/logout.component';
import { AuthGuard } from './auth.guard';
import { IndexComponent } from './index/index.component';
import { AccountMenuComponent } from './account-menu/account-menu.component';
import { AccountSecurityComponent } from './account-security/account-security.component';
import { AccountWalletComponent } from './account-wallet/account-wallet.component';
import { RegisterComponent } from './register/register.component';
import { DetailKibbleComponent } from './detail-kibble/detail-kibble.component';
export const routes: Routes = [
    {path: 'login', component: LoginFormComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'account', component: AccountMenuComponent, canActivate: [AuthGuard]},
    {path: 'logout', component: LogoutComponent},
    {path: 'security', component: AccountSecurityComponent, canActivate: [AuthGuard]},
    {path: 'wallet', component: AccountWalletComponent, canActivate: [AuthGuard]},
    {path: 'profile', component: EditCustomerAccountDataFormComponent, canActivate: [AuthGuard]},
    {path: 'catalog', component: HomePageComponent, canActivate: [AuthGuard]},
    {path: 'kibbles-details', component: DetailKibbleComponent, canActivate: [AuthGuard]},
    {path: 'app-shopping-cart', component: ShoppingCartComponent, canActivate: [AuthGuard]},
    {path: '**', component: IndexComponent},
];