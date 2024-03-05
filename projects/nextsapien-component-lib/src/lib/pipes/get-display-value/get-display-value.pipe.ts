import { CurrencyPipe, formatNumber } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import moment from 'moment';
import { GridColumn } from '../../model/grid-column';
import { DateLocalizationPipe } from '../date-localization/date-localization.pipe';

@Pipe({
  name: 'getDisplayValue',
  pure: true,
})
export class GetDisplayValuePipe implements PipeTransform {
  constructor(private dateLocalizationPipe: DateLocalizationPipe, private currencyPipe: CurrencyPipe) {}

  transform(data: any, column: GridColumn, dateFormat: string, corporateCurrency: string = 'USD'): string {
    if ((typeof data != 'boolean' && !data && data !== 0) || !column) {
      return '';
    }

    if (column.controlType === 'SingleSelect' || column.controlType === 'MultiSelect') {
      if (Array.isArray(data)) {
        return data.map((value) => column.values?.find((col) => col.Key === value)?.Value)?.join(', ') ?? '';
      }
      return column.values?.find((col) => col.Key === data)?.Value;
    }

    if (column.controlType === 'AutoComplete' || column.controlType === 'AutoCompleteMulti' || column.controlType === 'MultiField') {
      if (Array.isArray(data)) {
        return data?.map((kv) => kv?.Value)?.join(', ') ?? '';
      }
      return data?.Value;
    }

    if (column.controlType === 'Date') {
      if (moment.isMoment(data)) {
        return this.dateLocalizationPipe.transform(data, dateFormat);
      } else {
        return this.dateLocalizationPipe.transform(data?.toString() ?? '', dateFormat);
      }
    }

    if (column.controlType === 'Html') {
      return data.replace(/<[^>]*>/g, '');
    }

    if (column.controlType === 'Percent') {
      return `${formatNumber(data, 'en-US', '1.0-0')}%`;
    }

    if (column.controlType === 'Currency') {
      return this.currencyPipe.transform(Math.round(data), corporateCurrency, 'symbol', '1.0-0');
    }

    if (column.controlType === 'Boolean') {
      return data ? 'Yes' : 'No';
    }

    if (data.en) return data.en;

    return data.toString();
  }
}
