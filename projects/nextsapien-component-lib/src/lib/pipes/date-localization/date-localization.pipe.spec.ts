import moment from 'moment';
import { DateLocalizationPipe } from './date-localization.pipe';

describe('DateLocalizationPipe', () => {
  const pipe: DateLocalizationPipe = new DateLocalizationPipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('Should return null', () => {
    expect(pipe.transform('invalid', 'MM-DD-YYYY')).toEqual(null);
  });

  it('Should not be null', () => {
    expect(pipe.transform('09/04/1986', 'MM-DD-YYYY')).not.toBeNull();
    expect(pipe.transform('September 4 1986', 'MM-DD-YYYY')).not.toBeNull();
    expect(pipe.transform('September 4 1986 8:30 PM', 'MM-DD-YYYY')).not.toBeNull();
    expect(pipe.transform('Thursday, September 4 1986 8:30 PM', 'MM-DD-YYYY')).not.toBeNull();
    expect(pipe.transform('8:30 PM', 'MM-DD-YYYY')).not.toBeNull();
    expect(pipe.transform('8:30:00 PM', 'MM-DD-YYYY')).not.toBeNull();
  });

  it('Should return valid date', () => {
    expect(pipe.transform('1986-04-09', 'YYYY-MM-DD')).toEqual(moment('1986-04-09', moment?.ISO_8601, true).format('YYYY-MM-DD').toString());
    expect(pipe.transform('1986-04-09', 'DD/MM/YYYY')).toEqual(moment('1986-04-09', moment?.ISO_8601, true).format('DD/MM/YYYY').toString());
  });
});
