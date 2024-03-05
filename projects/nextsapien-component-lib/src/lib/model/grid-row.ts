import { MenuItem } from 'primeng/api';
import { GridKeyValueDto } from './grid-column';

export interface GridRow<T> {
  id?: number;
  hasEditPermissions?: boolean;
  data: T;
  displayValues?: T;
  rowMenuItems?: MenuItem[];
}

export interface GridCellData extends GridKeyValueDto {
  Url?: string;
}
