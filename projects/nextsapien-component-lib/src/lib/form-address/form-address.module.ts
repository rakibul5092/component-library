import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgSelectModule } from '@ng-select/ng-select';
import { GoogleAddressInputModule } from '../google-address/google-address-input.module';
import { TranslationModule } from '../translation.module';
import { AddressFormComponent } from './address-form/address-form.component';

@NgModule({
  declarations: [AddressFormComponent],
  imports: [CommonModule, ReactiveFormsModule, GoogleAddressInputModule, TranslationModule, NgSelectModule, IonicModule, FormsModule],
  exports: [AddressFormComponent],
})
export class FormAddressModule {}
