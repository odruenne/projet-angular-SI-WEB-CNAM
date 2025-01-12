import { Routes } from '@angular/router';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { EditCustomerAccountDataFormComponent } from './edit-customer-account-data-form/edit-customer-account-data-form.component';
import { LogoutComponent } from './logout/logout.component';
import { AuthGuard } from './auth.guard';
export const routes: Routes = [
    {path: 'login', component: LoginFormComponent},
    {path: 'logout', component: LogoutComponent},
    {path: 'profile', component: EditCustomerAccountDataFormComponent, canActivate: [AuthGuard]},
    {path: 'catalog', component: HomePageComponent, canActivate: [AuthGuard]},
    {path: 'app-shopping-cart', component: ShoppingCartComponent, canActivate: [AuthGuard]},
    {path: '**', component: LoginFormComponent}
];