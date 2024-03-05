import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'lib-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputFieldComponent),
      multi: true,
    },
  ],
})
export class InputFieldComponent implements ControlValueAccessor {
  public control: FormControl = new FormControl();
  @Input() label: string;
  @Input() placeholder = ' ';
  @Input() type: string;
  @Input() readonly = false;
  public value: string;
  public disabled: boolean;
  private onTouched: any;
  private onChange: any;

  constructor() {}

  writeValue(value: string): void {
    this.value = value;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  public change(event: any): void {
    this.onChange(event.target.value);
  }

  public touched(touched: boolean) {
    this.onTouched(touched);
  }
}
