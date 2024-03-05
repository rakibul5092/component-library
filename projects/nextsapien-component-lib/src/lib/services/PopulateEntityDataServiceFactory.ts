import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { DefaultDataServiceConfig, HttpUrlGenerator } from '@ngrx/data';

@Injectable({
  providedIn: 'root',
})
export class PopulateEntityDataServiceFactory {
  private entityName: string = '';
  constructor(protected http: HttpClient, protected config: DefaultDataServiceConfig, protected httpUrlGenerator: HttpUrlGenerator) {}

  setEntityName(entityName: string) {
    this.entityName = entityName;
    return this.entityName;
  }

  create() {
    const entityName = this.entityName;
    const http = this.http;
    const httpUrlGenerator = this.httpUrlGenerator;
    const config = this.config;

    return {
      entityName,
      http,
      httpUrlGenerator,
      config,
    };
  }
}
