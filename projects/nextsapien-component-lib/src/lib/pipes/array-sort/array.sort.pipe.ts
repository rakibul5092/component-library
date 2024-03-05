import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort',
})
export class ArraySortPipe implements PipeTransform {
  transform(array: any, field: string, type: string = 'ASC'): any[] {
    if (!Array.isArray(array)) {
      return null;
    }
    switch (type.toUpperCase()) {
      case 'ASC': {
        array.sort((a: any, b: any) => {
          if (a[field] < b[field]) {
            return -1;
          } else if (a[field] > b[field]) {
            return 1;
          } else {
            return 0;
          }
        });
        break;
      }
      case 'DSC': {
        array.sort((a: any, b: any) => {
          if (a[field] > b[field]) {
            return -1;
          } else if (a[field] < b[field]) {
            return 1;
          } else {
            return 0;
          }
        });
        break;
      }
    }
    return array;
  }
}
