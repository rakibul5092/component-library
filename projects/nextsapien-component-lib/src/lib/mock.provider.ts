export function Mock<T>(obj: T): jest.Mocked<T> {
  const mock = {};

  typeMemebers(obj).forEach((member) => {
    mock[member] = jest.fn();
  });

  return mock as jest.Mocked<T>;
}

function typeMemebers<T>(obj: T): string[] {
  const properties = new Set();
  let currentObj = obj;

  do {
    Object.getOwnPropertyNames(currentObj).map((item) => properties.add(item));
  } while ((currentObj = Object.getPrototypeOf(currentObj)));

  return [...properties.keys()] as string[];
}
