import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
  user = {
    lastName: '',
    firstName: '',
    address: '',
    zipCode: '',
    city: '',
    country: '',
    phoneNumber: '',
    mailAddress: '',
    civility: '',
    login: '',
    password: '',
    confirmPassword: ''

  };

  @Output() formSubmitted = new EventEmitter<any>();

  onSubmit() {
    if (this.user.password === this.user.confirmPassword) {
      this.formSubmitted.emit(this.user);
    } else {
      console.log('Les mots de passe ne correspondent pas.');
    }
  }
}
