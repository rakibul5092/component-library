import { DecimalPipe } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Inject, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { SafeHtml } from '@angular/platform-browser';
import moment from 'moment';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { debounceTime, first, takeUntil } from 'rxjs/operators';
import { FormFieldType } from '../enums/form-field-type';
import { TooltipDirectionPreference } from '../enums/tooltip-direction-preference';
import { SelectOption } from '../model/select-option';

@Component({
  selector: 'lib-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFieldComponent implements OnInit, OnDestroy {
  @ViewChild('matSelect') matSelect: MatSelect;
  public focused = false;

  public FormFieldType = FormFieldType;
  private _dateFormat = 'MM/DD/YYYYY';
  public dateInputPlaceholder = '';
  private componentDestroyed$: Subject<null> = new Subject();
  public DirectionPreference = TooltipDirectionPreference;
  public searchOptions$: ReplaySubject<SelectOption<any>[]>;
  public showEditor = false;

  public editorContentStyle = `
    .mce-content-readonly {
      background-color: #EFF2F3;
    }
  `;

  @Input() fieldName: string;
  @Input() label: string;
  @Input() placeholder = '';
  @Input() message = '';
  @Input() useTooltips = false;
  @Input() descriptionText = '';
  @Input() formFieldControl: UntypedFormControl;
  @Input() submitted = false;
  @Input() required = false;
  @Input() type = 'text';
  @Input() maxLength = 524288;
  @Input() options: SelectOption<any>[] = [];
  @Input() iconHtml: SafeHtml;
  @Input() invalidPatternMessage: string;
  @Input()
  set dateFormat(format: string) {
    this._dateFormat = (format || 'MM/DD/YYYYY').toUpperCase();
  }
  @ViewChild('dateInput') dateInput: ElementRef;
  @Input() currencySymbol: string;
  @Input() hideCents = false;
  @Input() isEditable = true;
  @Input() rowEditConfirmationObsv: Observable<{ fieldName: string; fieldValue: any }>;
  @Input() errorInlineMode = false;

  @Output() rowEdit: EventEmitter<{ fieldName: string; fieldValue: any }> = new EventEmitter();

  constructor(@Inject(MAT_DATE_FORMATS) private dateFormats, private decimalPipe: DecimalPipe, private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    if (this.formFieldControl && this.type === FormFieldType.date) {
      this.dateFormats.display.dateInput = this._dateFormat;
      this.dateInputPlaceholder = this.placeholder || this._dateFormat;
      this.formFieldControl.valueChanges.pipe(first()).subscribe((value) => {
        if (!moment.isMoment(value)) {
          this.processDate(value);
        }
      });
    } else if (this.formFieldControl && this.type === FormFieldType.currency) {
      // Start with zero. Format and output the currency
      let cleanedValue = this.formFieldControl.value;
      if (this.formFieldControl.value && typeof this.formFieldControl.value === 'string') {
        cleanedValue = parseFloat(this.formFieldControl.value.replace(/(?:[.](?=.*[.])|[^\d.-])+/g, ''));
      }
      // Ensure that zero values do not get stripped out
      if (cleanedValue !== 0) {
        this.processCurrency(cleanedValue || '');
      }
      // Update the currency format after changes
      this.formFieldControl.valueChanges.pipe(debounceTime(500), takeUntil(this.componentDestroyed$)).subscribe((value) => {
        // Skip if the value has no length or the last character is a period
        if (value?.length > 0 && value.charAt(value.length - 1) !== '.') {
          // Remove all non-numeric characters (except one decimal point and negative sign) before passing to decimal pipe
          cleanedValue = value.replace(/(?:[.](?=.*[.])|[^\d.-])+/g, '');
          // Validate only numbers
          if ((cleanedValue.length > 0 && cleanedValue !== '.' && cleanedValue !== '-') || !isNaN(parseFloat(cleanedValue)) || cleanedValue === '') {
            this.formFieldControl.setErrors(null);
            // Format and output the currency
            this.processCurrency(cleanedValue);
          } else {
            this.formFieldControl.setErrors({ incorrect: true });
          }
        }
      });
    } else if (this.formFieldControl && this.type === FormFieldType.multiselectdropdown) {
      this.searchOptions$ = new ReplaySubject<SelectOption<any>[]>();
      this.searchOptions$.next(this.options.slice());
    } else if (this.formFieldControl && this.type === FormFieldType.percentage) {
      this.processPercentage(this.formFieldControl.value);
      this.formFieldControl.valueChanges.pipe(debounceTime(500), takeUntil(this.componentDestroyed$)).subscribe((value: number) => {
        this.processPercentage(value);
      });
    } else if (this.formFieldControl && this.type === FormFieldType.text && this.errorInlineMode) {
      this.formFieldControl.valueChanges.pipe(takeUntil(this.componentDestroyed$)).subscribe((value) => {
        if (this.required && !value) {
          this.formFieldControl.setErrors({ required: true });
        }
      });
    }

    this.rowEditConfirmationObsv?.pipe(takeUntil(this.componentDestroyed$)).subscribe((response) => {
      if (response?.fieldName === this.fieldName && response.fieldValue < 0) {
        this.matSelect.close();
        (document.querySelector(':focus') as HTMLElement)?.blur();
      }
    });

    // https://github.com/tinymce/tinymce-angular/issues/76
    // Due to an issue with TinyMCE that they don't seem to think they can fix on their end,
    // editors opened within some types of Angular Material components such as the one
    // we use in our expansion panels will throw an error due to a race condition with the
    // document having fully loaded. So, we need to wait a while to show the editor. Annoying!
    setTimeout(() => {
      this.showEditor = true;
      this.changeDetectorRef.detectChanges();
    }, 1000);
  }

  public searchMultiSelect(query: string) {
    if (!this.options) {
      return;
    }
    this.searchOptions$.next(query ? this.options.filter((option) => option.label.toLowerCase().indexOf(query.toLowerCase()) > -1) : this.options.slice());
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next(null);
    this.componentDestroyed$.complete();
  }

  // ----- Methods called by template -----

  /**
   * A method to clear the value of the control name passed to it
   *
   * @param controlName - Name for control of cleared input
   */
  public clear(): void {
    this.formFieldControl.setValue('');
  }

  /**
   * @param $event - Object which contains date selected using mat-datepicker or entered manually by user
   *
   * Transform user entered date using provided dateFormat
   */
  public processDate(value): void {
    this.focused = false;
    let parsedDate = moment(value, moment?.ISO_8601, true);
    if (!parsedDate.isValid()) {
      // If the value is entered manually by user then parse the value based on the date format
      parsedDate = moment(value, this._dateFormat, false);
    }
    if (parsedDate.isValid()) {
      this.formFieldControl.setValue(parsedDate);
    }
  }

  public processCurrency(value: number | string): void {
    let formattedCurrency = this.decimalPipe.transform(value, '1.0-2', 'en-US');
    if (this.hideCents) {
      formattedCurrency = this.decimalPipe.transform(value, '1.0-0', 'en-US');
    }
    this.formFieldControl.setValue(formattedCurrency, { emitEvent: false });
  }

  public handleFocus(): void {
    this.focused = true;
  }

  public handleFocusOut(): void {
    this.focused = false;
  }

  public handleFieldClicked(event: any): void {
    if (!this.isEditable && this.rowEdit && this.rowEditConfirmationObsv) {
      this.rowEdit.emit({
        fieldName: this.fieldName,
        fieldValue: this.formFieldControl,
      });
      event.stopPropagation();
      event.preventDefault();
    }
  }

  public handleClick(event: any): void {
    event.stopPropagation();
    event.preventDefault();
  }

  private processPercentage(value: number): void {
    if (value) {
      const strVal = value.toString().split('.')[1];

      if (strVal?.length > 2) {
        this.formFieldControl.setValue(parseFloat(value.toString()).toFixed(2), { emitEvent: false });
      }
    }
  }
}
