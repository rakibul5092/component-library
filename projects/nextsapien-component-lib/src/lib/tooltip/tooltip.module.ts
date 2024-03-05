import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TooltipDirective } from '../directives/tooltip/tooltip.directive';
import { TooltipComponent } from './tooltip.component';

@NgModule({
  declarations: [TooltipComponent, TooltipDirective],
  entryComponents: [TooltipComponent],
  exports: [TooltipDirective],
  imports: [CommonModule, OverlayModule],
})
export class TooltipModule {}
