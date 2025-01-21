import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TransformToAsteriskPipe } from '../account-wallet/transformToAsteriskPipe';
import { FormFieldHighlightDirective } from '../form-field-highlight.directive';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';

@NgModule({
  declarations: [
    TransformToAsteriskPipe,
    FormFieldHighlightDirective,
    FooterComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    TransformToAsteriskPipe,
    FormFieldHighlightDirective,
    FooterComponent,
    HeaderComponent,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
