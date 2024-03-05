import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TranslationService } from '../../translation.service';
import { Language } from '../language';

@Component({
  selector: 'lib-language-toggler',
  templateUrl: './language-toggler.component.html',
  styleUrls: ['./language-toggler.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LanguageTogglerComponent implements OnInit {
  // @Input() isDynamicTanslation = false;
  public selectedLanguage = 'en';
  private languages = Language;

  constructor(private translate: TranslationService) {}

  ngOnInit(): void {
    this.selectedLanguage = this.translate.currentLang;
    if (!this.selectedLanguage) {
      this.selectedLanguage = 'en';
      localStorage.setItem('language', this.selectedLanguage);
    }
  }

  public getKeys() {
    return Object.keys(this.languages);
  }

  public setLanguage(language: string) {
    this.selectedLanguage = language;
    this.translate.use(language);
    localStorage.setItem('language', language);
  }
}
