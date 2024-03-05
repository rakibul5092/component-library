import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Subject } from 'rxjs/internal/Subject';
import { distinctUntilChanged, filter, finalize, takeUntil } from 'rxjs/operators';
import { AddressFormService } from '../address-form.service';

@Component({
  selector: 'lib-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss'],
})
export class AddressFormComponent implements OnInit, OnDestroy {
  @Input() addressForm: UntypedFormGroup;
  @Input() isPhoneNumber: boolean = false;
  private googleAddressState;
  public countriesList = [];
  public statesList = [];
  public notFoundText: string;
  private _unsubscribeAll: Subject<any>;
  loadingStates;
  @Output() addressUpdated = new EventEmitter<any>();

  constructor(private addressFormService: AddressFormService, private untypedFormBuilder: UntypedFormBuilder) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.addressForm = this.untypedFormBuilder.group({
      address: [''],
      city: [''],
      state: [''],
      town: [''],
      zip: [''],
      country: [''],
      phone: [''],
      address_line_2: [''],
    });
    if (this.addressForm && this.addressForm.value.state) {
      this.googleAddressState = this.addressForm.value.state;
    }
    this.addressFormService.countries.pipe(takeUntil(this._unsubscribeAll)).subscribe((countries) => {
      this.countriesList = countries;
    });
    this.addressFormService.authTokenDefined.pipe(takeUntil(this._unsubscribeAll)).subscribe((isTokenAvailable) => {
      if (isTokenAvailable) {
        // this.addressFormService;
      }
    });
    this.addressForm
      .get('country')
      ?.valueChanges.pipe(
        takeUntil(this._unsubscribeAll),
        filter((term) => !!term),
        distinctUntilChanged(),
      )
      .subscribe((result) => {
        this.addressFormService.authTokenDefined.pipe(takeUntil(this._unsubscribeAll)).subscribe((isTokenAvailable) => {
          if (isTokenAvailable) {
            // this.addressFormService;
            this.addressForm.get('state').setValue(null);
            this.countryChange(result, true);
          }
        });
      });
    this.addressForm?.valueChanges
      .pipe(
        takeUntil(this._unsubscribeAll),
        distinctUntilChanged((pre: any, curr: any) => JSON.stringify(pre) === JSON.stringify(curr)),
      )
      .subscribe((result) => {
        this.addressUpdated.emit(result);
      });
    this.addressFormService.states.pipe(takeUntil(this._unsubscribeAll)).subscribe((states) => {
      this.statesList = states;
      if (this.googleAddressState) {
        const stateObject = this.statesList.find((state) => state.state_name === this.googleAddressState);
        if (stateObject) {
          this.addressForm.controls['state'].setValue(stateObject.state_name);
        }
      }
    });
  }

  public handleAddressChange(address: any) {
    const countryObject = this.countriesList.find((country) => country.country_short_name === address.country);
    if (countryObject) {
      this.addressForm.get('country').setValue(countryObject.country_name);
    }
    this.googleAddressState = address.state;
    this.addressForm.controls['state'].setValue(address.state);
    this.addressForm.controls['city'].setValue(address.town);
    this.addressForm.controls['zip'].setValue(address.postal_code);
    this.addressForm.controls['address'].setValue(address.name);
    this.addressUpdated.emit(this.addressForm.value);
  }
  public countryChange(value, isTokenAvailable: boolean) {
    if (!isTokenAvailable) {
      return;
    }
    this.loadingStates = true;
    this.addressFormService
      .fetchStates(value)
      .pipe(
        finalize(() => {
          this.loadingStates = false;
        }),
      )
      .subscribe(
        (states) => {
          this.notFoundText = 'No states found';
        },
        (error) => {},
      );
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
}
