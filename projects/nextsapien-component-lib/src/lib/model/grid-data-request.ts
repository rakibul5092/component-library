import { GridSortDirection } from './grid-sort-direction';
import { UserFilter } from './user-filter';

export interface GridDataRequest {
  from: number;
  size: number;
  userFilters?: UserFilter[];
  sortField?: string;
  sortDirection?: GridSortDirection;
  groupByField?: string;
  searchString?: string;
}
