export class FilterOperator<T> {
  label: string;
  value: T;
  identifier?: any;
  identifier2?: any;
  backendQueryUrl?: string;

  constructor(label: string, value: T, identifier?: any, identifier2?: any, backendQueryUrl?: string) {
    this.label = label;
    this.value = value;
    this.identifier = identifier;
    this.identifier2 = identifier2;
    this.backendQueryUrl = backendQueryUrl;
  }
}
