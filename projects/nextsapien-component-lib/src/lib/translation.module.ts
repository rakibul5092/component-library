import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MissingTranslationHandler, MissingTranslationHandlerParams, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export class TranslateHandler implements MissingTranslationHandler {
  private response: String;

  handle(params: MissingTranslationHandlerParams) {
    // eslint-disable-next-line no-console -- because this is the required console
    console.debug('*** Missing text for:', params.key);
    return 'some translated text'; // here u can return translation
  }
}
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  imports: [
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
      defaultLanguage: 'en',
      useDefaultLang: true,
      missingTranslationHandler: [{ provide: MissingTranslationHandler, useClass: TranslateHandler }],
    }),
  ],
  exports: [TranslateModule],
})
export class TranslationModule {}
