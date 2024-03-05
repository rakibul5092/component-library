import { Pipe, PipeTransform } from '@angular/core';
import { SelectOption } from '../../model/select-option';

@Pipe({
  name: 'getMultiSelectDisplayText',
  pure: true,
})
export class GetMultiSelectDisplayTextPipe implements PipeTransform {
  transform(formValue: any[], options: SelectOption<any>[]): string {
    if (Array.isArray(formValue) && formValue?.length > 0) {
      return formValue.map((value) => options.find((option) => option.value === value)?.label)?.join(', ');
    } else {
      return '';
    }
  }
}
