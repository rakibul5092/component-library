import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslationModule } from '../../translation.module';
import { TranslationService } from '../../translation.service';
import { DynamicTranslationPipe } from './dynamic-translator.pipe';

describe('DynamicTranslationPipe', () => {
  let pipe: DynamicTranslationPipe;
  let translateService: TranslationService;
  const sampleData = {
    en: 'Hello World!',
    fr: 'Bonjour le monde!',
    es: 'Hola Mundo!',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, BrowserAnimationsModule, TranslationModule],
      providers: [TranslationService],
    });

    translateService = TestBed.get(TranslationService);
    pipe = new DynamicTranslationPipe(translateService);
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('returns "..." if currentLang is null/undefined', () => {
    expect(pipe.transform(sampleData)).toBe('...');
  });

  it('returns correct translation', () => {
    translateService.langs = ['en', 'fr', 'es'];

    for (const [key, value] of Object.entries(sampleData)) {
      translateService.currentLang = key;
      expect(pipe.transform(sampleData)).toBe(value);
    }
  });
});
