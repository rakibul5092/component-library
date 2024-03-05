import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { debounceTime, filter, takeUntil } from 'rxjs/operators';
import { FilterOperator } from '../../model/filter-operator';
import { SelectOption } from '../../model/select-option';

@Component({
  selector: 'lib-select-filter',
  templateUrl: './select-filter.component.html',
  styleUrls: ['./select-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectFilterComponent implements OnInit, OnChanges {
  @ViewChild('select', { static: false }) select: any;

  @Input() submitted = false;
  @Input() placeholder = 'select an option';
  @Input() multiple = false;
  @Input() operator = '';
  @Input() disabled = false;
  @Input() showSelectMessage = false;
  @Input() formFieldControl = new UntypedFormControl();
  @Input() options: FilterOperator<any>[];
  @Input() backendQueryUrl: string;
  @Input() getFiltersOptions: (backendQueryUrl: string, value: string, options) => Observable<any[]>;

  public required = true;
  public focused = false;
  public filteredOptions: SelectOption<any>[];
  public readonly thresholdOptionValue = 10;

  private searchString: string;
  private debouncer$: Subject<string> = new Subject<string>();
  private componentDestroyed$: Subject<null> = new Subject();

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.filteredOptions = this.options;
    this.debouncer$
      .pipe(
        debounceTime(300),
        filter((searchString) => searchString.length > 1),
        takeUntil(this.componentDestroyed$),
      )
      .subscribe((searchString) => {
        this.getFiltersOptions(this.backendQueryUrl, searchString, this.options)?.subscribe(() => {
          this.filterChange(this.searchString, false);
          this.changeDetectorRef.detectChanges();
        });
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.disabled) {
      this.formFieldControl.disable({ emitEvent: false });
    } else {
      this.formFieldControl.enable({ emitEvent: false });
    }
    if (changes['options']) {
      if (!changes['options'].firstChange) {
        this.formFieldControl.setValue(null, { emitEvent: false });
      }
      this.filteredOptions = this.options;
      if (this.getFiltersOptions && this.backendQueryUrl) {
        this.filterChange(this.searchString, false);
      }
    }
  }

  private transformValue(optionValue: string): void {
    if (this.filteredOptions.findIndex((option) => option?.value === optionValue) < 0) {
      this.filteredOptions.push(this.options.find((option) => option?.value === optionValue));
    }
  }

  // ----- Methods called by template -----

  public filterChange(searchString: string, emitFilterChange: boolean = true): void {
    if (this.getFiltersOptions && this.backendQueryUrl && emitFilterChange) {
      this.debouncer$.next(searchString);
      if (searchString?.length < 1) {
        this.filteredOptions = [];
      }
    } else {
      this.filteredOptions = this.options.filter((x) => x.label?.toLowerCase().indexOf(searchString) >= 0);
    }
    this.searchString = searchString;
    if (this.multiple && this.formFieldControl.value?.length > 0) {
      this.formFieldControl.value?.forEach((option: SelectOption<any>) => {
        this.transformValue(option.value);
      });
    } else if (this.formFieldControl.value) {
      this.transformValue(this.formFieldControl.value?.value);
    }
  }

  public handleFocus(): void {
    this.focused = true;
  }

  public handleFocusOut(): void {
    this.focused = false;
  }
}
