import { GridColumn } from './grid-column';
import { GridRow } from './grid-row';

export class EditCompleteEvent {
  field: string;
  column: GridColumn;
  row: GridRow<any>;
  value: any;
  previousValue: any;

  constructor(event: PrimeNgEditEvent, previousValue: any) {
    this.field = event.field;
    this.column = event.data?.column;
    this.row = event.data?.row;
    this.value = event.data?.row[event.field];
    this.previousValue = previousValue;
  }
}

export type PrimeNgEditEvent = {
  index?: number;
  field: string;
  data: {
    column: GridColumn;
    row: GridRow<any>;
  };
};
