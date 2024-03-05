import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AutoFocusDirective } from './auto-focus/autoFocus.directive';
import { DebounceClickDirective } from './debounce-click/debounce-click.directive';
import { LazyImageDirective } from './lazy-image/lazy-image.directive';
import { OrdinaryPositiveNumberDirective } from './ordinary-positive-number/ordinary-positive-number.directive';
import { TrimFieldValueDirective } from './trim-field-value/trim-field-value.directive';
import { ResizedDirective } from "./resized-observer/resized-observer.directive";


const Directives = [
  ResizedDirective, LazyImageDirective, TrimFieldValueDirective, AutoFocusDirective, OrdinaryPositiveNumberDirective, DebounceClickDirective
]

@NgModule({
  declarations: [...Directives],
  imports: [CommonModule],
  exports: [...Directives],
})
export class DirectiveModule {}
