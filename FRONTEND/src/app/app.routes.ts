import { Routes } from '@angular/router';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { EditCustomerAccountDataFormComponent } from './edit-customer-account-data-form/edit-customer-account-data-form.component';
import { LogoutComponent } from './logout/logout.component';
import { AuthGuard } from './auth.guard';
import { NoAuthGuard } from './no-auth.guard';
import { IndexComponent } from './index/index.component';
import { AccountMenuComponent } from './account-menu/account-menu.component';
import { AccountSecurityComponent } from './account-security/account-security.component';
import { AccountWalletComponent } from './account-wallet/account-wallet.component';
import { RegisterComponent } from './register/register.component';
import { DetailsKibblesComponent } from './details-kibbles/details-kibbles.component';
export const routes: Routes = [
    {path: 'login', component: LoginFormComponent},
    {path: 'register', component: RegisterComponent, canActivate: [NoAuthGuard]},
    {path: 'account', component: AccountMenuComponent, canActivate: [AuthGuard]},
    {path: 'logout', component: LogoutComponent},
    {path: 'account-security', component: AccountSecurityComponent, canActivate: [AuthGuard]},
    {path: 'account-wallet', component: AccountWalletComponent, canActivate: [AuthGuard]},
    {path: 'account-profile', component: EditCustomerAccountDataFormComponent, canActivate: [AuthGuard]},
    {path: 'catalog', component: HomePageComponent, canActivate: [AuthGuard]},
    {path: 'details-kibbles/:id', component: DetailsKibblesComponent, canActivate: [AuthGuard]},
    {path: 'app-shopping-cart', component: ShoppingCartComponent, canActivate: [AuthGuard]},
    {path: '**', component: IndexComponent},
];