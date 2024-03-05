import { SelectOption } from '../../model/select-option';
import { GetMultiSelectDisplayTextPipe } from './get-multi-select-display-text.pipe';

describe('GetMultiSelectDisplayTextPipe', () => {
  const pipe: GetMultiSelectDisplayTextPipe = new GetMultiSelectDisplayTextPipe();
  const options: SelectOption<any>[] = [new SelectOption('one', 1), new SelectOption('two', 2), new SelectOption('three', 3)];

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('Should return empty string', () => {
    expect(pipe.transform(null, options)).toEqual('');
    expect(pipe.transform(undefined, options)).toEqual('');
    expect(pipe.transform([], options)).toEqual('');
  });

  it('Should return null when source is not an array', () => {
    expect(pipe.transform([options[0].value, options[1].value], options)).toEqual(`${options[0].label}, ${options[1].label}`);
    expect(pipe.transform([options[2].value], options)).toEqual(options[2].label);
  });
});
