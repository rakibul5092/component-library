import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { GOOGLE_API_KEY, GOOGLE_TRANSLATE_BASE_URL } from '../shared/constants';
import { TranslatedApiResponse, Translations } from './translate-response.model';
@Injectable({
  providedIn: 'root',
})
export class DynamicTranslateService {
  constructor(private http: HttpClient) {}

  // -------------------- http --------------------
  public translate(query: string[], toLanguage: string): Observable<Translations[]> {
    return this.http
      .post<TranslatedApiResponse>(GOOGLE_TRANSLATE_BASE_URL + '?key=' + GOOGLE_API_KEY, {
        q: query,
        target: toLanguage,
      })
      .pipe(
        first(),
        map((actions) => {
          return actions.data.translations.map((item) => {
            // converting entity symbols to special characters if there any.
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = item.translatedText;
            return { ...item, translatedText: tempDiv.innerHTML };
          });
        }),
      );
  }
}
