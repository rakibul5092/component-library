export interface TranslatedApiResponse {
  data: {
    translations: {
      translatedText: string;
      detectedSourceLanguage: string;
    }[];
  };
}
export interface Translations {
  translatedText: string;
  detectedSourceLanguage: string;
}
