import {
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {NG_VALIDATORS, NG_VALUE_ACCESSOR} from '@angular/forms';
import {AsYouTypeFormatter, PhoneNumber, PhoneNumberFormat, PhoneNumberUtil} from 'google-libphonenumber';

import {setTheme} from 'ngx-bootstrap/utils';

import {CountryCode} from '../data/country-code';
import {CountryISO} from '../enums/country-iso.enum';
import {SearchCountryField} from '../enums/search-country-field.enum';
import {ChangeData} from '../model/change-data';
import {Country} from '../model/country.model';
import {phoneNumberValidator} from './tel-input.validator';
import {PhoneNumberFormat as CustomPhoneNumberFormat} from '../enums/phone-number-format.enum';

@Component({
  selector: 'app-tel-input',
  templateUrl: './tel-input.component.html',
  styleUrls: ['./tel-input.component.scss'],
  providers: [
    CountryCode,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TelInputComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useValue: phoneNumberValidator,
      multi: true,
    },
  ],
})
export class TelInputComponent implements OnInit, OnChanges {
  @ViewChild('inputElement') inputElement: ElementRef<HTMLInputElement>;
  @ViewChild('dropDownElementRef') dropDownElementRef: ElementRef<HTMLDivElement>;
  @ViewChild('countryList') countryList: ElementRef<HTMLUListElement>;

  @Input() value: string | undefined = '';
  @Input() enablePlaceholder = true;
  @Input() maskPhoneNumber = true;
  @Input() eagerMask = false;
  @Input() customPlaceholder: string;
  @Input() numberFormat: CustomPhoneNumberFormat = CustomPhoneNumberFormat.International;
  @Input() cssClass = 'form-control';
  @Input() onlyCountries: Array<string> = [];
  @Input() enableAutoCountrySelect = true;
  @Input() searchCountryFlag = false;
  @Input() searchCountryField: SearchCountryField[] = [SearchCountryField.All]; // TODO: ADD FUNCTIONALITY
  @Input() searchCountryPlaceholder = 'Search Country';
  @Input() maxLength: number;
  @Input() selectFirstCountry = true;
  @Input() selectedCountryISO: CountryISO = CountryISO.UnitedStates;
  @Input() phoneValidation = true;
  @Input() inputId = 'phone';
  @Input() separateDialCode = false;
  @Input() showDropDownArrow = false;
  separateDialCodeClass: string;

  @Output() readonly countryChange = new EventEmitter<Country>();

  selectedCountry: Country = {
    areaCodes: undefined,
    dialCode: '',
    htmlId: '',
    flagClass: '',
    iso2: '',
    name: '',
    placeHolder: '',
    priority: 0,
  };

  phoneNumber: string | undefined = '';
  phoneMask: string = '';
  allCountries: Array<Country> = [];
  filteredCountries: Array<Country> = [];
  phoneUtil: PhoneNumberUtil = PhoneNumberUtil.getInstance();
  disabled = false;
  errors: Array<any> = ['Phone number is required.'];
  countrySearchText = '';
  width: '500px';

  onTouched = () => {};
  propagateChange = (_: ChangeData) => {};

  constructor(private countryCodeData: CountryCode) {
    // If this is not set, ngx-bootstrap will try to use the bs3 CSS (which is not what we've embedded) and will
    // Add the wrong classes and such
    setTheme('bs4');
  }

  ngOnInit(): void {
    this.init();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const selectedISO = changes['selectedCountryISO'];
    if (this.allCountries && selectedISO && selectedISO.currentValue !== selectedISO.previousValue) {
      this.updateSelectedCountry();
    }
    this.checkSeparateDialCodeStyle();
  }

  /*
		This is a wrapper method to avoid calling this.ngOnInit() in writeValue().
		Ref: http://codelyzer.com/rules/no-life-cycle-call/
	*/
  init(): void {
    this.fetchCountryData();
    if (this.onlyCountries.length) {
      this.allCountries = this.allCountries.filter((c) => this.onlyCountries.includes(c.iso2));
    }
    this.updateSelectedCountry();
    this.checkSeparateDialCodeStyle();
  }

  public setSelectedCountry(country: Country): void {
    this.selectedCountry = country;
    this.countryChange.emit(country);
  }

  /**
   * Search country based on country name, iso2, dialCode or all of them.
   */
  public searchCountry(): void {
    if (!this.countrySearchText) {
      this.filteredCountries = [...this.allCountries];
      return;
    }
    const countrySearchTextLower = this.countrySearchText.toLowerCase();
    this.filteredCountries = this.allCountries.filter((country) => {
      return country.name.toLowerCase().startsWith(countrySearchTextLower);
    });

    this.checkSeparateDialCodeStyle();
  }

  public onPhoneNumberChange(): void {
    let countryCode: string | undefined;
    // Handle the case where the user sets the value programatically based on a persisted ChangeData obj.
    if (this.phoneNumber && typeof this.phoneNumber === 'object') {
      const numberObj: ChangeData = this.phoneNumber;
      this.phoneNumber = numberObj.number;
      countryCode = numberObj.countryCode;
    }

    this.value = this.phoneNumber;
    countryCode = countryCode || this.selectedCountry.iso2;
    // @ts-ignore
    const number = this.getParsedNumber(this.phoneNumber, countryCode);

    // auto select country based on the extension (and areaCode if needed) (e.g select Canada if number starts with +1 416)
    if (this.enableAutoCountrySelect) {
      countryCode =
        number && number.getCountryCode()
          ? // @ts-ignore
            this.getCountryIsoCode(number.getCountryCode(), number)
          : this.selectedCountry.iso2;
      if (countryCode && countryCode !== this.selectedCountry.iso2) {
        const newCountry = this.allCountries
          .sort((a, b) => {
            return a.priority - b.priority;
          })
          .find((c) => c.iso2 === countryCode);
        if (newCountry) {
          this.selectedCountry = newCountry;
        }
      }
    }
    countryCode = countryCode ? countryCode : this.selectedCountry.iso2;

    this.checkSeparateDialCodeStyle();

    if (!this.value) {
      // Reason: avoid https://stackoverflow.com/a/54358133/1617590
      // tslint:disable-next-line: no-null-keyword
      // @ts-ignore
      this.propagateChange(null);
    } else {
      const intlNo = number ? this.phoneUtil.format(number, PhoneNumberFormat.INTERNATIONAL) : '';

      // parse phoneNumber if separate dial code is needed
      if (this.separateDialCode && intlNo) {
        this.value = this.removeDialCode(intlNo);
      }

      this.propagateChange({
        number: this.value,
        internationalNumber: intlNo,
        nationalNumber: number ? this.phoneUtil.format(number, PhoneNumberFormat.NATIONAL) : '',
        e164Number: number ? this.phoneUtil.format(number, PhoneNumberFormat.E164) : '',
        countryCode: countryCode.toUpperCase(),
        dialCode: '+' + this.selectedCountry.dialCode,
      });
    }
  }

  public onCountrySelect(country: Country, el: { focus: () => void }): void {
    this.setSelectedCountry(country);

    this.checkSeparateDialCodeStyle();

    if (this.phoneNumber && this.phoneNumber.length > 0) {
      this.value = this.phoneNumber;
      const number = this.getParsedNumber(this.phoneNumber, this.selectedCountry.iso2);
      const intlNo = number ? this.phoneUtil.format(number, PhoneNumberFormat.INTERNATIONAL) : '';
      // parse phoneNumber if separate dial code is needed
      if (this.separateDialCode && intlNo) {
        this.value = this.removeDialCode(intlNo);
      }

      this.propagateChange({
        number: this.value,
        internationalNumber: intlNo,
        nationalNumber: number ? this.phoneUtil.format(number, PhoneNumberFormat.NATIONAL) : '',
        e164Number: number ? this.phoneUtil.format(number, PhoneNumberFormat.E164) : '',
        countryCode: this.selectedCountry.iso2.toUpperCase(),
        dialCode: '+' + this.selectedCountry.dialCode,
      });
    } else {
      // Reason: avoid https://stackoverflow.com/a/54358133/1617590
      // tslint:disable-next-line: no-null-keyword
      // @ts-ignore
      this.propagateChange(null);
    }


    this.phoneMask = this.countryCodeData.getPhoneMask(`+${country.dialCode}`);

    // reset value
    this.countrySearchText = "";
    this.searchCountry();
    el.focus();
  }

  public onInputKeyPress(event: KeyboardEvent): void {
    const allowedChars = /[0-9]/;
    const allowedCtrlChars = /[axcv]/; // Allows copy-pasting
    const allowedOtherKeys = ['ArrowLeft', 'ArrowUp', 'ArrowRight', 'ArrowDown', 'Home', 'End', 'Insert', 'Delete', 'Backspace'];

    if (!allowedChars.test(event.key) && !(event.ctrlKey && allowedCtrlChars.test(event.key)) && !allowedOtherKeys.includes(event.key)) {
      event.preventDefault();
    }
  }

  public identify(index: number, item: Country): string {
    return item.htmlId;
  }

  public registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  public writeValue(obj: any): void {
    if (obj === undefined) {
      this.init();
    }
    this.phoneNumber = obj;
    setTimeout(() => {
      this.onPhoneNumberChange();
    }, 1);
  }

  public resolvePlaceholder(): string {
    let placeholder = '';
    if (this.customPlaceholder) {
      placeholder = this.customPlaceholder;
    } else if (this.selectedCountry.placeHolder) {
      placeholder = this.selectedCountry.placeHolder;
      if (this.separateDialCode) {
        placeholder = this.removeDialCode(placeholder);
      }
    }
    return placeholder;
  }

  public focusInputElement(): void {
    setTimeout(() => {
      this.inputElement?.nativeElement?.focus();
    }, 100);
  }

  public onResize(event: number): void {
    setTimeout(() => {
      this.dropDownElementRef?.nativeElement?.style.setProperty('--container-width', `${event}px` );
      if(this.dropDownElementRef?.nativeElement) {
        this.dropDownElementRef.nativeElement.classList.add('force-show');
      }
    });
  }

  public focusSelectedCountry(): void {
    setTimeout(() => {
      const selectedCountry =
        this.countryList.nativeElement.querySelector(".iti__country.selected");
      selectedCountry.scrollIntoView();
    })
  }

  /* --------------------------------- Helpers -------------------------------- */
  /**
   * Returns parse PhoneNumber object.
   * @param phoneNumber string
   * @param countryCode string
   */
  private getParsedNumber(phoneNumber: string, countryCode: string): PhoneNumber {
    let number: PhoneNumber;
    try {
      number = this.phoneUtil.parse(phoneNumber, countryCode.toUpperCase());
    } catch (e) {
      console.debug(e);
    }
    // @ts-ignore
    return number;
  }

  /**
   * Adjusts input alignment based on the dial code presentation style.
   */
  private checkSeparateDialCodeStyle() {
    if (this.separateDialCode && this.selectedCountry) {
      const cntryCd = this.selectedCountry.dialCode;
      this.separateDialCodeClass = 'separate-dial-code iti-sdc-' + (cntryCd.length + 1);
    } else {
      this.separateDialCodeClass = '';
    }
  }

  /**
   * Cleans dialcode from phone number string.
   * @param phoneNumber string
   */
  private removeDialCode(phoneNumber: string): string {
    const number = this.getParsedNumber(phoneNumber, this.selectedCountry.iso2);
    phoneNumber = this.phoneUtil.format(number, PhoneNumberFormat[this.numberFormat]);
    if (phoneNumber.startsWith('+') && this.separateDialCode) {
      phoneNumber = phoneNumber.substr(phoneNumber.indexOf(' ') + 1);
    }
    return phoneNumber;
  }

  /**
   * Sifts through all countries and returns iso code of the primary country
   * based on the number provided.
   * @param countryCode country code in number format
   * @param number PhoneNumber object
   */
  private getCountryIsoCode(countryCode: number, number: PhoneNumber): string | undefined {
    // Will use this to match area code from the first numbers
    // @ts-ignore
    const rawNumber = number['values_']['2'].toString();
    // List of all countries with countryCode (can be more than one. e.x. US, CA, DO, PR all have +1 countryCode)
    const countries = this.allCountries.filter((c) => c.dialCode === countryCode.toString());
    // Main country is the country, which has no areaCodes specified in country-code.ts file.
    const mainCountry = countries.find((c) => c.areaCodes === undefined);
    // Secondary countries are all countries, which have areaCodes specified in country-code.ts file.
    const secondaryCountries = countries.filter((c) => c.areaCodes !== undefined);
    let matchedCountry = mainCountry ? mainCountry.iso2 : undefined;

    /*
			Iterate over each secondary country and check if nationalNumber starts with any of areaCodes available.
			If no matches found, fallback to the main country.
		*/
    secondaryCountries.forEach((country) => {
      // @ts-ignore
      country.areaCodes.forEach((areaCode) => {
        if (rawNumber.startsWith(areaCode)) {
          matchedCountry = country.iso2;
        }
      });
    });

    return matchedCountry;
  }

  /**
   * Gets formatted example phone number from phoneUtil.
   * @param countryCode string
   */
  protected getPhoneNumberPlaceHolder(countryCode: string): string {
    try {
      return this.phoneUtil.format(this.phoneUtil.getExampleNumber(countryCode), PhoneNumberFormat[this.numberFormat]);
    } catch (e) {
      // @ts-ignore
      return e;
    }
  }

  /**
   * Clearing the list to avoid duplicates (https://github.com/webcat12345/tel-input/issues/248)
   */
  protected fetchCountryData(): void {
    this.allCountries = [];

    this.countryCodeData.allCountries.forEach((c) => {
      const country: Country = {
        name: c[0].toString(),
        iso2: c[1].toString(),
        dialCode: c[2].toString(),
        priority: +c[3] || 0,
        areaCodes: (c[4] as string[]) || undefined,
        htmlId: `iti-0__item-${c[1].toString()}`,
        flagClass: `iti__${c[1].toString().toLocaleLowerCase()}`,
        placeHolder: '',
      };

      if (this.enablePlaceholder) {
        country.placeHolder = this.getPhoneNumberPlaceHolder(country.iso2.toUpperCase());
      }

      this.allCountries.push(country);
    });
    this.filteredCountries = JSON.parse(JSON.stringify(this.allCountries));
  }

  /**
   * Updates selectedCountry.
   */
  private updateSelectedCountry() {
    if (this.selectedCountryISO) {
      // @ts-ignore
      this.selectedCountry = this.allCountries.find((c) => {
        return c.iso2.toLowerCase() === this.selectedCountryISO.toLowerCase();
      });
      if (this.selectedCountry) {
        this.phoneMask = this.countryCodeData.getPhoneMask(`+${this.selectedCountry.dialCode}`);
        if (this.phoneNumber) {
          this.onPhoneNumberChange();
        } else {
          // Reason: avoid https://stackoverflow.com/a/54358133/1617590
          // tslint:disable-next-line: no-null-keyword
          // @ts-ignore
          this.propagateChange(null);
        }
      }
    }
  }
}
