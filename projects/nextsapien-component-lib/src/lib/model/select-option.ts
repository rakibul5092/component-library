/**
 * This model class contains a label, value and disabled boolean
 */
export class SelectOption<T> {
  public label: string;
  public value: T;
  public disabled? = false;

  constructor(label: string, value: T, disabled = false) {
    this.label = label;
    this.value = value;
    this.disabled = disabled;
  }
}
