import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[ordinaryPositiveNumber]',
})
export class OrdinaryPositiveNumberDirective {
  @HostListener('keydown', ['$event']) onKeydown(event: any) {
    if (event.key !== 'Backspace' && event.key !== '.' && isNaN(Number(event.key))) {
      event.preventDefault();
    }
  }
}
