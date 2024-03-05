import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'lib-google-address-input',
  templateUrl: './google-address-input.component.html',
  styleUrls: ['./google-address-input.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class GoogleAddressInputComponent {
  @Input() inputValue: string = '';
  @Input() label;
  @Output() addressEvent: EventEmitter<any> = new EventEmitter();

  private address: any;

  public handleAddressChange(event: any) {
    this.address = {
      fullAddress: '',
      country: '',
      state: '',
      town: '',
      street: '',
      postal_code: '',
      street_number: '',
    };
    if (event.address_components) {
      event.address_components.forEach((address) => {
        if (address && address.types) {
          switch (true) {
            case address.types.includes('country'): {
              this.address.country = address.short_name;
              break;
            }
            case address.types.includes('administrative_area_level_1'): {
              this.address.state = address.long_name;
              break;
            }
            case address.types.includes('locality'): {
              this.address.town = address.long_name;
              break;
            }
            case address.types.includes('route'): {
              this.address.street = address.long_name;
              break;
            }
            case address.types.includes('postal_code'): {
              this.address.postal_code = address.long_name;
              break;
            }
            case address.types.includes('street_number'): {
              this.address.street_number = address.long_name;
              break;
            }
          }
        }
      });
    }
    this.address.fullAddress = event.formatted_address;
    this.address.name = event.name;
    this.addressEvent.emit(this.address);
  }
}
