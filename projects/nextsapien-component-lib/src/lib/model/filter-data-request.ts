import { GridSortDirection } from './grid-sort-direction';
import { UserFilter } from './user-filter';

export interface FilterDataRequest {
  Name: string;
  ProjectGridFilterId?: number;
  UserFilters: UserFilter[];
  Sort?: {
    Field: string;
    Direction: GridSortDirection;
  };
}
