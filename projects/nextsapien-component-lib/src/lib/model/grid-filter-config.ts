import { Observable } from 'rxjs';
import { FilterDataRequest } from './filter-data-request';
import { FilterDefinition } from './filter-definition';

export interface GridFilterConfig {
  handleGetFilters(): Observable<FilterDataRequest[]>;
  handleGetFilterDefinitions(): Observable<FilterDefinition[]>;
  handleCreateFilters(userFilter: FilterDataRequest): Observable<any>;
  handleUpdateFilters(userFilter: FilterDataRequest): Observable<any>;
  handleDeleteFilters(ProjectGridFilterId: number): Observable<any>;
  handleGetFilterOptions(backendQueryUrl: string, searchString: string): Observable<any>;
  handleGetFilterOptionData(backendQueryUrl: string, searchKey: string): Observable<any>;
}
