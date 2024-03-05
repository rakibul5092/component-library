import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import moment from 'moment';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'lib-date-filter',
  templateUrl: './date-filter.component.html',
  styleUrls: ['./date-filter.component.scss'],
})
export class DateFilterComponent implements OnInit, OnDestroy {
  @Input() submitted = false;
  @Input() placeholder = 'select an option';
  @Input() disabled = false;
  @Input() rangeSelect = false;
  @Input() formFieldControl = new UntypedFormControl();
  @Input() dateFormat = 'MM/DD/YYYY';

  public rangeGroup = new UntypedFormGroup({
    start: new UntypedFormControl(),
    end: new UntypedFormControl(),
  });
  public dateInputPlaceholder = '';
  public focused = false;
  private componentDestroyed$: Subject<null> = new Subject();

  constructor(@Inject(MAT_DATE_FORMATS) private dateFormats) {}

  ngOnInit(): void {
    this.dateFormats.display.dateInput = this.dateFormat;
    this.dateInputPlaceholder = this.placeholder || this.dateFormat;
    if (this.rangeSelect && this.formFieldControl.value?.length) {
      this.processDate(this.formFieldControl.value[0], 'start');
      this.processDate(this.formFieldControl.value[1], 'end');
    } else {
      this.processDate(this.formFieldControl.value);
    }
    this.rangeGroup.valueChanges.pipe(takeUntil(this.componentDestroyed$)).subscribe((value) => {
      this.formFieldControl.setValue(value);
    });
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next(null);
    this.componentDestroyed$.complete();
  }

  /**
   * @param $event - Object which contains date selected using mat-datepicker or entered manually by user
   *
   * Transform user entered date using provided dateFormat
   */
  public processDate(value, formControlName?: string): void {
    this.focused = false;
    let parsedDate = moment(value, moment?.ISO_8601, true);
    if (!parsedDate.isValid()) {
      // If the value is entered manually by user then parse the value based on the date format
      parsedDate = moment(value, this.dateFormat, false);
    }
    if (parsedDate.isValid()) {
      if (formControlName) {
        this.rangeGroup.get(formControlName).setValue(parsedDate);
      } else {
        this.formFieldControl.setValue(parsedDate);
      }
    }
  }

  public handleFocus(): void {
    this.focused = true;
  }
}
