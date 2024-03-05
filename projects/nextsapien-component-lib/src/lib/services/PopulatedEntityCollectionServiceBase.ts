import { HttpClient } from '@angular/common/http';
import { Inject } from '@angular/core';

import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';

import { DefaultDataServiceConfig, EntityCollectionServiceBase, EntityCollectionServiceElementsFactory, HttpUrlGenerator } from '@ngrx/data';
import { PopulateEntityDataServiceFactory } from './PopulateEntityDataServiceFactory';
import { Model } from '../core/model.interface';

export class PopulatedEntityCollectionServiceBase<T extends Model> extends EntityCollectionServiceBase<T> {
  protected entityUrl: string;
  protected http: HttpClient;
  protected populateEntityDataServiceFactory: PopulateEntityDataServiceFactory;
  protected httpUrlGenerator: HttpUrlGenerator;
  protected config: DefaultDataServiceConfig;

  constructor(@Inject(String) entityName, serviceElementsFactory: EntityCollectionServiceElementsFactory, populateEntityDataServiceFactory: PopulateEntityDataServiceFactory) {
    super(entityName, serviceElementsFactory);
    this.populateEntityDataServiceFactory = populateEntityDataServiceFactory;
    const { http, httpUrlGenerator, config } = this.populateEntityDataServiceFactory.create();
    this.entityUrl = httpUrlGenerator.entityResource(this.entityName, config.root, false);
    this.http = http;
  }
  getWithPopulatedFields(conditions: Object, populate: string | any, limit?: string, skip?: string, sort?: string, select?: string, distinct?: string, count?: string) {
    return this.getWithQuery(this.generateQueryString(conditions, populate, limit, skip, sort, select, distinct, count));
  }

  getIdWithPopulatedFields(id: string, populate: string | any, limit?: string, skip?: string, sort?: string) {
    return this.getByKey(id + '?' + this.generateQueryString({}, populate, limit, skip, sort));
  }

  selectEntityById(id: string): Observable<T> {
    return this.entityMap$.pipe(
      map((entities) => entities[id]),
      first(),
    );
  }

  getEntityCount(conditions: Object): Observable<number> {
    let conditionsQuery = '';
    let queryString = '';
    if (conditions) {
      conditionsQuery = 'conditions=' + JSON.stringify(conditions);
    }
    queryString = 'count=true' + (conditionsQuery ? '&' + conditionsQuery : '');
    return this.http.get<number>(this.entityUrl + '?' + queryString);
  }

  getCustomURL(url: String): Observable<any> {
    return this.http.get<number>(this.entityUrl + url);
  }

  generateQueryString(conditions: Object, populate: string | any, limit?: string, skip?: string, sort?: string, select?: string, distinct?: string, count?: string): string {
    let populateQuery = '';
    let conditionsQuery = '';
    let queryString = '';
    if (conditions) {
      conditionsQuery = 'conditions=' + JSON.stringify(conditions);
    }
    if (populate) {
      if (typeof populate === 'string' || populate instanceof String) populateQuery = 'populate=' + populate;
      else populateQuery = 'populate=' + JSON.stringify(populate);
    }
    queryString = conditionsQuery + (populateQuery ? '&' + populateQuery : '');
    if (limit) {
      queryString = queryString + '&limit=' + limit;
    }
    if (skip) {
      queryString = queryString + '&skip=' + skip;
    }
    if (sort) {
      queryString = queryString + '&sort=' + sort;
    }

    if (select) {
      queryString = queryString + '&select=' + select;
    }

    if (distinct) {
      queryString = queryString + '&distinct=' + distinct;
    }

    if (count) {
      queryString = queryString + '&count=' + count;
    }
    return queryString;
  }
}
