import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({ selector: '[trimFieldValue]' })
export class TrimFieldValueDirective {
  constructor(private formControl: NgControl) {}

  @HostListener('change') onChange() {
    this.formControl.control.setValue(this.formControl.control.value.trim());
  }
}
