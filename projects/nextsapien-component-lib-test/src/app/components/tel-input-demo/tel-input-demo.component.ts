import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CountryISO, PhoneNumberFormat, SearchCountryField } from 'nextsapien-component-lib';

@Component({
  selector: 'app-tel-input-demo',
  templateUrl: './tel-input-demo.component.html',
  styleUrls: ['./tel-input-demo.component.scss'],
})
export class TelInputDemoComponent {
  public separateDialCode = false;
  public SearchCountryField = SearchCountryField;
  public CountryISO = CountryISO;
  public PhoneNumberFormat = PhoneNumberFormat;
  public preferredCountries: CountryISO[] = [CountryISO.UnitedStates, CountryISO.UnitedKingdom];
  public phoneForm = new FormGroup({
    phone: new FormControl(undefined, [Validators.required]),
  });

  changePreferredCountries() {
    this.preferredCountries = [CountryISO.India, CountryISO.Canada];
  }
}
