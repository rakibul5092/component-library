import { GridColumn } from './grid-column';

export interface GridColumnChange {
  groupByField?: GridColumn;
  columns?: GridColumn[];
  filteredColumns?: GridColumn[];
}
