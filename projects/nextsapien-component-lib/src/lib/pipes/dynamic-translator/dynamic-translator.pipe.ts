import { Pipe, PipeTransform } from '@angular/core';
import { TranslationService } from '../../translation.service';

@Pipe({
  name: 'dynamicTranslate',
  pure: false,
})
export class DynamicTranslationPipe implements PipeTransform {
  constructor(private translateService: TranslationService) {}
  transform(data: { en: string; fr: string; es: string }): string {
    return data && this.translateService.currentLang ? data[this.translateService.currentLang] : '...';
  }
}
