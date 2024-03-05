import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GridDataRequest, GridKeyValueDto, GridSortDirection } from 'nextsapien-component-lib';
import { delay, map } from 'rxjs/operators';

export interface Customer {
  id?: number;
  name?: string;
  activity?: number;
  countryId?: number;
  countryCode?: string;
  company?: string;
  date?: string;
  status?: number[];
  representativeName?: string;
  representativeImage?: string;
}

@Injectable()
export class GridDemoService {
  constructor(private http: HttpClient) {}

  getCustomersLarge(event: GridDataRequest) {
    return this.http.get<any>('assets/grid-demo-data.json').pipe(
      delay(600), // simulate http calls w/ delay
      map((json) => {
        // Demo purposes only! Sorting and pagination will happen on the server-side in a real app.
        let customers = <Customer[]>json.data;
        if (event.searchString) {
          customers = customers.filter((customer) => customer.name?.toLowerCase()?.includes(event.searchString.toLowerCase()));
        }
        if (event.groupByField) {
          customers = customers.sort((a, b) => {
            let sortValue = this.getCompareValue(event.groupByField, 'Ascending', a, b);

            if (!sortValue && event.sortField) {
              sortValue = this.getCompareValue(event.sortField, event.sortDirection, a, b);
            }

            return sortValue;
          });
        } else if (event.sortField) {
          customers = customers.sort((a, b) => this.getCompareValue(event.sortField, event.sortDirection, a, b));
        }
        return { data: customers.slice(event.from, event.from + event.size), count: customers.length };
      }),
    );
  }

  private getCompareValue(sortField: string, sortDirection: GridSortDirection, a: any, b: any): number {
    let v1 = a[sortField];
    let v2 = b[sortField];

    if (v1 === null || v2 === null) {
      if (v1 === null && v2 === null) {
        return 0;
      } else {
        if (sortDirection === 'Ascending') {
          return v1 === null ? 1 : -1;
        } else {
          return v1 === null ? -1 : 1;
        }
      }
    }

    if (sortField === 'countryId') {
      v1 = customerCountryNames.find((countryName) => countryName.Key === <number>v1)?.Value;
      v2 = customerCountryNames.find((countryName) => countryName.Key === <number>v2)?.Value;
    } else if (sortField === 'status') {
      v1 = (<number[]>v1)
        .map((statusKey) => customerStatuses.find((status) => status.Key === statusKey)?.Value)
        ?.sort()
        .join(', ');
      v2 = (<number[]>v2)
        .map((statusKey) => customerStatuses.find((status) => status.Key === statusKey)?.Value)
        ?.sort()
        .join(', ');
    }

    if (typeof v1 === 'number' && typeof v2 === 'number') {
      return sortDirection === 'Ascending' ? v1 - v2 : v2 - v1;
    } else if (typeof v1 === 'string' && typeof v2 === 'string') {
      return sortDirection === 'Ascending' ? v1?.localeCompare(v2) : v2?.localeCompare(v1);
    }
    return 0;
  }
}

export const customerStatuses: GridKeyValueDto[] = [
  { Key: 0, Value: 'unqualified' },
  { Key: 1, Value: 'proposal' },
  { Key: 2, Value: 'qualified' },
  { Key: 3, Value: 'new' },
  { Key: 4, Value: 'renewal' },
  { Key: 5, Value: 'negotiation' },
  { Key: 6, Value: 'foo' },
  { Key: 7, Value: 'bar' },
  { Key: 8, Value: 'baz' },
  { Key: 9, Value: 'dunno' },
  { Key: 10, Value: 'test' },
  { Key: 11, Value: 'banana' },
  { Key: 12, Value: 'twelve' },
];

export const customerCountryCodes = [
  'ar',
  'at',
  'au',
  'be',
  'bf',
  'bo',
  'by',
  'ca',
  'ch',
  'ci',
  'cl',
  'cm',
  'cn',
  'co',
  'cr',
  'cu',
  'cz',
  'de',
  'dk',
  'dz',
  'ec',
  'ee',
  'eg',
  'es',
  'fi',
  'fr',
  'gb',
  'gr',
  'gt',
  'hn',
  'hr',
  'hu',
  'id',
  'ie',
  'il',
  'is',
  'it',
  'jm',
  'jp',
  'lt',
  'lv',
  'ma',
  'mx',
  'my',
  'ng',
  'nl',
  'pa',
  'pe',
  'ph',
  'pk',
  'pl',
  'pr',
  'py',
  'qa',
  'ro',
  'rs',
  'sa',
  'se',
  'sg',
  'si',
  'sk',
  'sn',
  'th',
  'tn',
  'tr',
  'tw',
  'ua',
  'us',
  'uy',
  've',
  'vn',
  'za',
];

export const customerCountryNames: GridKeyValueDto[] = [
  { Key: 0, Value: 'Algeria' },
  { Key: 1, Value: 'Argentina' },
  { Key: 2, Value: 'Australia' },
  { Key: 3, Value: 'Austria' },
  { Key: 4, Value: 'Belarus' },
  { Key: 5, Value: 'Belgium' },
  { Key: 6, Value: 'Bolivia' },
  { Key: 7, Value: 'Burkina Faso' },
  { Key: 8, Value: 'Cameroon' },
  { Key: 9, Value: 'Canada' },
  { Key: 10, Value: 'Chile' },
  { Key: 11, Value: 'China' },
  { Key: 12, Value: 'Colombia' },
  { Key: 13, Value: 'Costa Rica' },
  { Key: 14, Value: 'Croatia' },
  { Key: 15, Value: 'Cuba' },
  { Key: 16, Value: 'Czech Republic' },
  { Key: 17, Value: 'Denmark' },
  { Key: 18, Value: 'Ecuador' },
  { Key: 19, Value: 'Egypt' },
  { Key: 20, Value: 'Estonia' },
  { Key: 21, Value: 'Finland' },
  { Key: 22, Value: 'France' },
  { Key: 23, Value: 'Germany' },
  { Key: 24, Value: 'Greece' },
  { Key: 25, Value: 'Guatemala' },
  { Key: 26, Value: 'Honduras' },
  { Key: 27, Value: 'Hungary' },
  { Key: 28, Value: 'Iceland' },
  { Key: 29, Value: 'Indonesia' },
  { Key: 30, Value: 'Ireland' },
  { Key: 31, Value: 'Israel' },
  { Key: 32, Value: 'Italy' },
  { Key: 33, Value: 'Ivory Coast' },
  { Key: 34, Value: 'Jamaica' },
  { Key: 35, Value: 'Japan' },
  { Key: 36, Value: 'Latvia' },
  { Key: 37, Value: 'Lithuania' },
  { Key: 38, Value: 'Malaysia' },
  { Key: 39, Value: 'Mexico' },
  { Key: 40, Value: 'Morocco' },
  { Key: 41, Value: 'Netherlands' },
  { Key: 42, Value: 'Nigeria' },
  { Key: 43, Value: 'Pakistan' },
  { Key: 44, Value: 'Panama' },
  { Key: 45, Value: 'Paraguay' },
  { Key: 46, Value: 'Peru' },
  { Key: 47, Value: 'Philippines' },
  { Key: 48, Value: 'Poland' },
  { Key: 49, Value: 'Puerto Rico' },
  { Key: 50, Value: 'Qatar' },
  { Key: 51, Value: 'Romania' },
  { Key: 52, Value: 'Saudi Arabia' },
  { Key: 53, Value: 'Senegal' },
  { Key: 54, Value: 'Serbia' },
  { Key: 55, Value: 'Singapore' },
  { Key: 56, Value: 'Slovakia' },
  { Key: 57, Value: 'Slovenia' },
  { Key: 58, Value: 'South Africa' },
  { Key: 59, Value: 'Spain' },
  { Key: 60, Value: 'Sweden' },
  { Key: 61, Value: 'Switzerland' },
  { Key: 62, Value: 'Taiwan' },
  { Key: 63, Value: 'Thailand' },
  { Key: 64, Value: 'Tunisia' },
  { Key: 65, Value: 'Turkey' },
  { Key: 66, Value: 'Ukraine' },
  { Key: 67, Value: 'United Kingdom' },
  { Key: 68, Value: 'United States' },
  { Key: 69, Value: 'Uruguay' },
  { Key: 70, Value: 'Venezuela' },
  { Key: 71, Value: 'Vietnam' },
];
