import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsKibblesComponent } from '../details-kibbles/details-kibbles.component';
import { SearchEngineComponent } from '../search-engine/search-engine.component';
import { KibblesList } from '../kibbles-list/kibbles-list.component';
import { SharedModule } from '../shared-module/shared-module.module';

@NgModule({
  declarations: [
    KibblesList,
    DetailsKibblesComponent,
    SearchEngineComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    KibblesList,
    DetailsKibblesComponent,
    SearchEngineComponent
  ]
})
export class KibblesModule { }
