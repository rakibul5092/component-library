import { CurrencyPipe } from '@angular/common';
import { GridColumn, GridControlType } from '../../model/grid-column';
import { DateLocalizationPipe } from '../date-localization/date-localization.pipe';
import { GetDisplayValuePipe } from './get-display-value.pipe';

const createColumn = (controlType: GridControlType): GridColumn => {
  return {
    controlType,
    name: 'foo',
    visible: true,
    label: 'Label',
    values: [
      // only used for Single/MultiSelect
      { Key: 456, Value: '456value' },
      { Key: 789, Value: '789value' },
    ],
  };
};

describe('GetDisplayValuePipe', () => {
  const pipe = new GetDisplayValuePipe(new DateLocalizationPipe(), new CurrencyPipe('en'));

  it('returns empty string if data is null/undefined', () => {
    const col = createColumn('Text');
    expect(pipe.transform(null, col, '')).toBe('');
    expect(pipe.transform(undefined, col, '')).toBe('');
  });

  it('returns empty string if data is null/undefined', () => {
    expect(pipe.transform(null, null, '')).toBe('');
    expect(pipe.transform(undefined, undefined, '')).toBe('');
  });

  it('returns empty string if data + column is null/undefined', () => {
    expect(pipe.transform(null, null, '')).toBe('');
    expect(pipe.transform(undefined, undefined, '')).toBe('');
  });

  it('can display Text data', () => {
    expect(pipe.transform('bar', createColumn('Text'), '')).toBe('bar');
  });

  it('can display Number data', () => {
    expect(pipe.transform(123, createColumn('Number'), '')).toBe('123');
  });

  describe('Boolean', () => {
    it('can display', () => {
      expect(pipe.transform(true, createColumn('Boolean'), '')).toBe('Yes');
      expect(pipe.transform(false, createColumn('Boolean'), '')).toBe('No');
    });
    it('can handle null/undefined/missing data', () => {
      expect(pipe.transform(null, createColumn('Boolean'), '')).toBe('');
      expect(pipe.transform(undefined, createColumn('Boolean'), '')).toBe('');
    });
  });

  describe('Percent', () => {
    it('can display percentages', () => {
      expect(pipe.transform(1234567890, createColumn('Percent'), '')).toBe('1,234,567,890%');
      expect(pipe.transform(100, createColumn('Percent'), '')).toBe('100%');
      expect(pipe.transform(50, createColumn('Percent'), '')).toBe('50%');
      expect(pipe.transform(0, createColumn('Percent'), '')).toBe('0%');
    });
  });

  describe('Currency', () => {
    it('can display USD', () => {
      expect(pipe.transform(0, createColumn('Currency'), '', 'USD')).toBe('$0');
      expect(pipe.transform(12345678.9, createColumn('Currency'), '', 'USD')).toBe('$12,345,679');
    });

    it('can display JPY', () => {
      expect(pipe.transform(0, createColumn('Currency'), '', 'JPY')).toBe('¥0');
      expect(pipe.transform(12345678.9, createColumn('Currency'), '', 'JPY')).toBe('¥12,345,679');
    });
  });

  describe('SingleSelect', () => {
    it('can display SingleSelect data', () => {
      expect(pipe.transform(456, createColumn('SingleSelect'), '')).toBe('456value');
    });

    it('can still display SingleSelect if data is an array', () => {
      expect(pipe.transform([456], createColumn('SingleSelect'), '')).toBe('456value');
    });
  });

  it('can display MultiSelect data', () => {
    const col = createColumn('MultiSelect');
    const expected = col.values.map((v) => v.Value).join(', ');
    expect(pipe.transform([456, 789], col, '')).toBe(expected);
  });

  describe('AutoComplete', () => {
    it('can display AutoComplete data', () => {
      const data = { Key: 456, Value: '456value' };
      const col = createColumn('AutoComplete');
      expect(pipe.transform(data, col, '')).toBe('456value');
    });

    it('can still display AutoComplete data if data is an array', () => {
      const data = [{ Key: 456, Value: '456value' }];
      const col = createColumn('AutoComplete');
      expect(pipe.transform(data, col, '')).toBe('456value');
    });
  });

  it('can display AutoCompleteMulti data', () => {
    const data = [
      { Key: 456, Value: '456value' },
      { Key: 789, Value: '789value' },
    ];
    const col = createColumn('AutoCompleteMulti');
    const expected = data.map((v) => v.Value).join(', ');
    expect(pipe.transform(data, col, '')).toBe(expected);
  });

  it('can display MultiField data', () => {
    const data = [
      { Key: 456, Value: '456value' },
      { Key: 789, Value: '789value' },
    ];
    const col = createColumn('MultiField');
    const expected = data.map((v) => v.Value).join(', ');
    expect(pipe.transform(data, col, '')).toBe(expected);
  });

  it('can display Html innerText (Html tags should be removed)', () => {
    expect(pipe.transform('<b>bold</b><i>italic</i><br>', createColumn('Html'), '')).toBe('bolditalic');
  });

  it('can display date in correct format', () => {
    expect(pipe.transform('2021-12-28T06:59:00-05:00', createColumn('Date'), 'MM/DD/YYYY')).toBe('12/28/2021');
  });
});
