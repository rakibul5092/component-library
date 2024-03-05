import { ArraySortPipe } from './array.sort.pipe';

describe('ArraySortPipe', () => {
  const pipe: ArraySortPipe = new ArraySortPipe();
  let dummyArray = [{ index: 2 }, { index: 1 }, { index: 1 }, { index: 5 }, { index: 4 }, { index: 3 }];
  const ascSortedArray = [{ index: 1 }, { index: 1 }, { index: 2 }, { index: 3 }, { index: 4 }, { index: 5 }];
  const descSortedArray = [{ index: 5 }, { index: 4 }, { index: 3 }, { index: 2 }, { index: 1 }, { index: 1 }];

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('Should not be null', () => {
    expect(pipe.transform(dummyArray, 'index', 'dsc')).not.toBeNull();
    expect(pipe.transform(dummyArray, 'index', 'asc')).not.toBeNull();
  });

  it('Should be sorted in asc', () => {
    expect(pipe.transform(dummyArray, 'index')).toEqual(ascSortedArray);
    expect(pipe.transform(dummyArray, 'index', 'asc')).toEqual(ascSortedArray);
    expect(pipe.transform(dummyArray, 'index', 'ASC')).toEqual(ascSortedArray);
  });

  it('Should be sorted in dsc', () => {
    expect(pipe.transform(dummyArray, 'index', 'dsc')).toEqual(descSortedArray);
    expect(pipe.transform(dummyArray, 'index', 'DSC')).toEqual(descSortedArray);
  });

  it('Should return empty array when source is empty array', () => {
    dummyArray = [];
    expect(pipe.transform(dummyArray, 'index', 'dsc')).not.toBeNull();
    expect(pipe.transform(dummyArray, 'index', 'asc')).not.toBeNull();
    expect(pipe.transform(dummyArray, 'index', 'asc')).toEqual([]);
  });

  it('Should return null when source is not an array', () => {
    expect(pipe.transform(1, 'index', 'asc')).toEqual(null);
    expect(pipe.transform('', 'index', 'asc')).toEqual(null);
    expect(pipe.transform({}, 'index', 'asc')).toEqual(null);
  });
});
