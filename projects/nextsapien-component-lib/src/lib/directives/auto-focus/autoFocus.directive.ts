import { AfterViewChecked, Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[autoFocus]',
})
export class AutoFocusDirective implements AfterViewChecked {
  @Input() autoFocus = false;

  constructor(private host: ElementRef) {}

  ngAfterViewChecked() {
    if (this.autoFocus) this.host.nativeElement.focus();
  }
}
