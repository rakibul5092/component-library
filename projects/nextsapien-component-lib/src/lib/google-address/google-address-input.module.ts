import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { GooglePlaceModule } from 'ngx-google-places-autocomplete';

import { GoogleAddressInputComponent } from './google-address-input/google-address-input.component';

@NgModule({
  declarations: [GoogleAddressInputComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatInputModule, MatFormFieldModule, GooglePlaceModule, IonicModule],
  exports: [GoogleAddressInputComponent],
})
export class GoogleAddressInputModule {}
