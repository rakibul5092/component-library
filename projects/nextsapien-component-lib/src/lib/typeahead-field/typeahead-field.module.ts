import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SearchBarModule } from '../search-bar/search-bar.module';
import { TooltipModule } from '../tooltip/tooltip.module';
import { TypeaheadFieldComponent, TypeaheadResultComponent } from './typeahead-field.component';

@NgModule({
  declarations: [TypeaheadFieldComponent, TypeaheadResultComponent],
  exports: [TypeaheadFieldComponent],
  imports: [CommonModule, MatProgressSpinnerModule, SearchBarModule, TooltipModule, MatMenuModule],
})
export class TypeaheadFieldModule {}
