import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingCartComponent } from '../shopping-cart/shopping-cart.component';
import { SharedModule } from '../shared-module/shared-module.module';

@NgModule({
  declarations: [
    ShoppingCartComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    ShoppingCartComponent
  ]
})
export class ShoppingCartModule { }
