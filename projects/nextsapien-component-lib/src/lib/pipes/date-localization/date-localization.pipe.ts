import { Pipe, PipeTransform } from '@angular/core';
import moment from 'moment';

@Pipe({
  name: 'dateLocalization',
  pure: true,
})
export class DateLocalizationPipe implements PipeTransform {
  transform(value: string | moment.Moment, dateFormat: string): string {
    if (moment.isMoment(value)) {
      return value.format(dateFormat).toString();
    } else {
      let parsedDate = moment(value, moment.ISO_8601, true);
      if (!parsedDate.isValid()) {
        // If the value is entered manually by user then parse the value based on the date format
        parsedDate = moment(value, dateFormat, false);
      }
      if (parsedDate.isValid()) {
        return parsedDate.format(dateFormat).toString();
      }
      return null;
    }
  }
}
