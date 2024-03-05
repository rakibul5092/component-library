import { AfterViewInit, Component, ElementRef, forwardRef, HostListener, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export const OTP_INPUT_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => OtpInputComponent),
  multi: true,
};
@Component({
  providers: [OTP_INPUT_VALUE_ACCESSOR],
  selector: 'app-otp-input',
  templateUrl: './otp-input.component.html',
  styleUrls: ['./otp-input.component.scss'],
})
export class OtpInputComponent implements OnInit, ControlValueAccessor, AfterViewInit {
  @Input() length: number = 6;
  @Input() placeholder = '';
  @Input() invalidBoxShadow = false;

  @ViewChildren('input') inputs: QueryList<ElementRef>;

  public values: Array<string>;
  public digitCount: Array<any>;
  public touched = false;
  private validKey = false;
  private isPasting = false;
  private fillStartIndex = 0;

  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit(): void {
    this.inputs.first.nativeElement.focus();
  }

  ngOnInit(): void {
    this.digitCount = new Array(this.length);
    this.values = new Array(this.length);

    this.elementRef.nativeElement.setAttribute('tabindex', '0');
  }

  onChange: any = (value: any) => {};
  onTouch: any = () => {};

  get value(): string {
    return this.values.join('');
  }

  set value(val) {
    if (this.value !== val) {
      this.acceptValue(val);
    }
  }

  public onClick(event): void {
    event.target.select();
  }

  writeValue(val: any): void {
    if (!val) {
      this.clearValue();
      return;
    }
    this.acceptValue(val);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  private acceptValue(val): void {
    let i = this.fillStartIndex; // Start adding value to inputs from the start index
    let k = 0;

    //  check if ngOninit has been called and use an async call to wait for nginit
    if (!this.inputs) {
      this.touched = true;
      setTimeout(() => this.acceptValue(val), 0);
      return;
    }

    //  set all inputs value and save it to the values array
    for (; i < this.length && k < val.length; i++, k++) {
      this.values[i] = val[k];
      this.inputs.get(i).nativeElement.value = val[k];
    }

    const j = i < this.length && i <= val.length ? i : i - 1;
    if (this.values[j] === undefined) {
      this.values[j] = '';
    }

    setTimeout(() => {
      const currentRenderedInput = this.inputs.get(j);
      if (currentRenderedInput) currentRenderedInput.nativeElement.focus();
    }, 0);
  }

  private clearValue(): void {
    this.values = new Array(this.length);
    if (!this.inputs) {
      return;
    }
    const len = this.inputs.length;
    for (let i = 0; i < len; i++) {
      this.inputs.get(i).nativeElement.value = '';
    }

    setTimeout(() => {
      const currentRenderedInput = this.inputs.get(0);
      if (currentRenderedInput) currentRenderedInput.nativeElement.focus();
    }, 0);
  }

  public updateValues(event: KeyboardEvent, index: number): void {
    if (!this.validKey) return;
    const currentInput = event.currentTarget as HTMLInputElement;

    if (event.key === 'ArrowLeft') {
      if (currentInput.previousElementSibling) {
        const previousElementSibling = currentInput.previousElementSibling as HTMLInputElement;
        if (previousElementSibling && previousElementSibling.select) {
          previousElementSibling.focus();
          previousElementSibling.select();
        }
      }
      return;
    } else if (event.key === 'ArrowRight') {
      if (currentInput.nextElementSibling) {
        const nextElementSibling = currentInput.nextElementSibling as HTMLInputElement;
        if (nextElementSibling && nextElementSibling.select) {
          nextElementSibling.focus();
          nextElementSibling.select();
        }
      }
      return;
    }

    this.values[index] = currentInput.value;
    this.onChange(this.value);
    if (this.values[index] === '') return;

    const nextInput = currentInput.nextElementSibling as HTMLInputElement;
    if (nextInput !== null) {
      nextInput.disabled = false;
      nextInput.focus();
      if (nextInput.select) {
        nextInput.select();
      }
    }
  }

  @HostListener('keydown', ['$event']) handleKeydown(event: KeyboardEvent) {
    this.touched = true;
    this.onTouch(this.touched);
    this.validKey = false;
    const currentInput = event.target as HTMLInputElement;
    const dataset = currentInput.dataset as DOMStringMap;
    const index = Number(dataset['inputIndex']);

    if (event.key === 'Backspace') {
      if (currentInput.value === '' && this.values[index] === '') {
        const previousInput = currentInput.previousElementSibling as HTMLInputElement;
        if (previousInput !== null) {
          previousInput.value = '';
          this.values[index - 1] = '';
          previousInput.focus();
          previousInput.select();
        }
      }
      this.values[index] = '';
      this.onChange(this.value);
      return;
    }
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      this.validKey = true;
      return;
    }

    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'v') {
      this.handleControlV(event);
    }

    if (!this.isDigitBackSpaceArrowSide(event.key)) {
      event.preventDefault();
      return;
    }

    const start = currentInput.selectionStart;
    const end = currentInput.selectionEnd;
    //  check the position of start and end cursor
    if (start === end) {
      //  check if input already has a value
      if (currentInput.value) {
        //  check the position of caret in the current input
        event.preventDefault();
        if (index < this.length) {
          let nextIndex = start > 0 ? index + 1 : index;
          let newValue = event.key;
          while (nextIndex < this.length) {
            const swap = this.values[nextIndex];
            this.values[nextIndex] = newValue;
            this.inputs.get(nextIndex).nativeElement.value = newValue;
            if (!swap) break;
            newValue = swap;
            nextIndex++;
          }

          if (nextIndex < this.length - 1) {
            this.inputs.get(index + 1).nativeElement.focus();
          }
        }
      }
    }

    this.validKey = true;
  }

  private isDigitBackSpaceArrowSide(key: string): boolean {
    return key === 'Backspace' || !isNaN(parseFloat(key)) || key === 'ArrowLeft' || key === 'ArrowRight' || key === 'Enter';
  }

  @HostListener('paste', ['$event']) handlePasting(event) {
    event.preventDefault();
    event.stopPropagation();
    if (this.isPasting) return;

    this.isPasting = true;
    const textToPaste = event.clipboardData.getData('text').trim();

    if (this.canPaste(textToPaste)) {
      this.touched = true;
      this.fillStartIndex = event.target.nodeName === 'INPUT' ? event.target.dataset.inputIndex : 0;
      this.value = textToPaste;
      this.onChange(this.value);
    }

    this.isPasting = false;
  }

  private canPaste(textToPaste: string): boolean {
    for (let i = 0; i < textToPaste.length; i++) {
      if (isNaN(Number(textToPaste[i]))) {
        this.isPasting = false;
        return false;
      }
    }
    return true;
  }

  private handleControlV(event: KeyboardEvent): void {
    if (this.isPasting) return;
    this.isPasting = true;
    if (navigator.clipboard) {
      navigator.clipboard.readText().then((textToPaste) => {
        if (this.canPaste(textToPaste)) {
          const target = event.target as HTMLInputElement;
          this.fillStartIndex = target.nodeName === 'INPUT' ? Number(target.dataset['inputIndex']) : 0;
          this.value = textToPaste;
          this.onChange(this.value);
        }
        this.isPasting = false;
      });
    }
  }
}
