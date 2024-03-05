import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ArraySortPipe } from './array-sort/array.sort.pipe';
import { DateLocalizationPipe } from './date-localization/date-localization.pipe';
import { DynamicTranslationPipe } from './dynamic-translator/dynamic-translator.pipe';
import { GetDisplayValuePipe } from './get-display-value/get-display-value.pipe';
import { GetMultiSelectDisplayTextPipe } from './get-multi-select-display-text/get-multi-select-display-text.pipe';
@NgModule({
  declarations: [ArraySortPipe, DynamicTranslationPipe, GetDisplayValuePipe, GetMultiSelectDisplayTextPipe, DateLocalizationPipe],
  imports: [CommonModule],
  exports: [ArraySortPipe, DynamicTranslationPipe, GetDisplayValuePipe, GetMultiSelectDisplayTextPipe, DateLocalizationPipe],
  providers: [GetDisplayValuePipe, GetMultiSelectDisplayTextPipe, DateLocalizationPipe],
})
export class PipeModule {}
