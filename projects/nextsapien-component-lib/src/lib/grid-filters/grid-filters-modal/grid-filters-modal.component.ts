import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormArray, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import moment from 'moment';
import { forkJoin, merge, Observable, Subject } from 'rxjs';
import { map, take, takeUntil, tap } from 'rxjs/operators';

import { DomSanitizer } from '@angular/platform-browser';
import { ConfirmationModalComponent } from '../../confirmation-modal/confirmation-modal.component';
import { FilterType } from '../../enums/filter-type';
import { FilterDataRequest } from '../../model/filter-data-request';
import { FilterOperator } from '../../model/filter-operator';
import { ItemActionHandler } from '../../model/item-action-handler';
import { GridFilterService } from '../services/grid-filter.service';

@Component({
  selector: 'lib-grid-filters-modal',
  templateUrl: './grid-filters-modal.component.html',
  styleUrls: ['./grid-filters-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridFiltersModalComponent implements OnInit, OnDestroy {
  public mode: 'edit' | 'create' = 'edit';
  public formGroup: UntypedFormGroup = new UntypedFormGroup({});
  public submitted = false;
  public dateFormat = 'mm/dd/yyyy';
  public applyFilterText: 'Apply' | 'Save' | 'Apply & Save' = 'Apply';
  public options = [];
  public operators = [];
  public values = [];
  public readonly FilterTypeEnum = FilterType;
  public headerIconTray: ItemActionHandler[] = [];
  public enableClearAll: boolean;
  public formGroupValueChanged = false;
  public existingFilterProjectID = 0;
  public invalidPatternMessage = '';
  public userFiltersList: FilterDataRequest[] = [];

  public getFiltersOptions: (backendQueryUrl: string, searchString: string, options) => Observable<any>;

  private formArrayValueChanged$: Subject<null> = new Subject();
  private componentDestroyed$: Subject<null> = new Subject();

  private retryAddingUserFilter = false;

  get UserFiltersFormControl() {
    return this.formGroup.controls['UserFilters'] as UntypedFormArray;
  }

  get NameFormControl() {
    return this.formGroup.controls['Name'];
  }

  constructor(
    private _formBuilder: UntypedFormBuilder,
    private dialogRef: MatDialogRef<GridFiltersModalComponent>,
    private dialog: MatDialog,
    private domSanitizer: DomSanitizer,
    private gridFilterService: GridFilterService,
    private changeDetectorRef: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public activeUserFilter: FilterDataRequest,
  ) {
    this.dateFormat = this.gridFilterService.dateFormat;
    this.headerIconTray.push(
      new ItemActionHandler(this.domSanitizer.bypassSecurityTrustHtml('<i class="icon-gen3-warning"></i>'), null, this.domSanitizer.bypassSecurityTrustHtml('test')),
    );
  }

  ngOnInit(): void {
    this.createFormGroup();
    this.initListeners();
    this.getFiltersOptions = (backendQueryUrl: string, searchString: string, options): Observable<any> => {
      return this.gridFilterService.getFiltersOptions(backendQueryUrl, searchString).pipe(
        tap((filteredOptions) => {
          filteredOptions.forEach((filteredOption) => {
            if (options.findIndex((option) => option.value === filteredOption.value) < 0) {
              options.push(new FilterOperator(filteredOption.key, filteredOption.value, options[0].identifier, options[0].identifier2, options[0].backendQueryUrl));
            }
          });
          this.changeDetectorRef.detectChanges();
        }),
      );
    };
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next(null);
    this.componentDestroyed$.complete();
    this.formArrayValueChanged$.next(null);
    this.formArrayValueChanged$.complete();
  }

  private initListeners() {
    this.gridFilterService.gridFilterDefinitions.pipe(takeUntil(this.componentDestroyed$)).subscribe(() => {
      this.options = this.gridFilterService.options;
      this.operators = this.gridFilterService.operators;
      this.values = this.gridFilterService.values;
    });

    if (Object.keys(this.activeUserFilter || {})?.length) {
      this.patchFormGroupValues(this.activeUserFilter);
      this.applyFilterText = 'Save';
    } else {
      this.gridFilterService.activeFilter.pipe(take(1)).subscribe((activeUserFilter) => {
        this.UserFiltersFormControl.clear();
        this.applyFilterText = 'Apply';
        this.activeUserFilter = activeUserFilter;
        this.patchFormGroupValues(activeUserFilter);
        if (!activeUserFilter || !activeUserFilter.Name || activeUserFilter.ProjectGridFilterId < 0) {
          this.formGroup.get('SaveFilter').setValue(false, { emitEvent: false });
          this.NameFormControl.disable();
        } else if (activeUserFilter.ProjectGridFilterId > -1) {
          this.NameFormControl.enable();
          this.formGroup.get('SaveFilter').setValue(true, { emitEvent: false });
        }
      });
    }

    this.gridFilterService.gridFilters.pipe(takeUntil(this.componentDestroyed$)).subscribe((userFiltersList) => {
      this.userFiltersList = userFiltersList;
      this.NameFormControl.updateValueAndValidity({ emitEvent: false });
      this.existingFilterProjectID = this.userFiltersList?.find((userFilter) => userFilter.Name === this.NameFormControl.value)?.ProjectGridFilterId;
    });

    this.formGroup.valueChanges.pipe(takeUntil(this.componentDestroyed$)).subscribe((response) => {
      if (this.retryAddingUserFilter) return null;
      this.formGroupValueChanged = true;
      this.enableClearAll = this.UserFiltersFormControl.controls.some((formControl) => formControl.valid);
      this.existingFilterProjectID = this.userFiltersList?.find((userFilter) => userFilter.Name === this.NameFormControl.value)?.ProjectGridFilterId;
    });

    this.formGroup
      .get('SaveFilter')
      .valueChanges.pipe(takeUntil(this.componentDestroyed$))
      .subscribe((response) => {
        if (response) {
          this.applyFilterText = 'Apply & Save';
          this.NameFormControl.enable();
        } else {
          this.applyFilterText = 'Apply';
          this.NameFormControl.disable();
        }
      });
  }

  private patchFormGroupValues(activeUserFilter: FilterDataRequest) {
    this.NameFormControl.patchValue(activeUserFilter?.Name || 'Custom Filter', { emitEvent: false });
    if (activeUserFilter?.UserFilters?.length === 0) {
      this.addUserFilter();
    } else {
      activeUserFilter?.UserFilters?.forEach((userFilter) => {
        this.addUserFilter(userFilter);
      });
    }
    if (typeof activeUserFilter?.ProjectGridFilterId == 'number') {
      this.mode = 'edit';
    } else {
      this.mode = 'create';
      if (!activeUserFilter?.Name) {
        this.addUserFilter();
      }
    }
  }

  private watchForValueChanges(): void {
    // cleanup any prior subscriptions before re-establishing new ones
    this.formArrayValueChanged$.next(null);
    merge(
      ...this.UserFiltersFormControl.controls.map((control: AbstractControl, index: number) =>
        control.valueChanges.pipe(
          takeUntil(this.formArrayValueChanged$),
          map((value) => ({ rowIndex: index, control: control, data: value })),
        ),
      ),
    ).subscribe((changes) => {
      const publicFieldNameIdentifier = changes.data.PublicFieldName?.identifier;
      const operatorTypeIdentifier = changes.data.OperatorType?.identifier;
      let controlFieldLength = 0;

      if (publicFieldNameIdentifier > -1 && operatorTypeIdentifier > -1) {
        controlFieldLength = this.values[changes.data.PublicFieldName?.identifier][changes.data.OperatorType?.identifier]?.length;
        for (let index = 0; index < controlFieldLength; index++) {
          if (this.UserFiltersFormControl.at(changes.rowIndex).get('Values').value?.length < 1) {
            (this.UserFiltersFormControl.at(changes.rowIndex).get('Values') as UntypedFormArray).clear({ emitEvent: false });
            (this.UserFiltersFormControl.at(changes.rowIndex).get('Values') as UntypedFormArray).push(new UntypedFormControl(), { emitEvent: false });
          }
        }
      }
      this.changeDetectorRef.detectChanges();
    });
  }

  private createFormGroup(): void {
    this.formGroup = this._formBuilder.group({
      Name: new UntypedFormControl('Custom Filter'),
      SaveFilter: new UntypedFormControl(true),
      UserFilters: this._formBuilder.array([]),
    });
  }

  private transformFilter() {
    const userFilterCriteria = [];
    this.submitted = true;
    if (this.formGroup.valid) {
      this.UserFiltersFormControl.value.forEach((userFilter) => {
        if (userFilter.PublicFieldName?.value && userFilter.OperatorType?.value) {
          let values = [];

          userFilter.Values.forEach((userFilterValue) => {
            if (userFilter.OperatorType?.identifier2 === FilterType.SingleSelect) {
              values.push(userFilterValue?.value?.toString());
            } else if (userFilter.OperatorType?.identifier2 === FilterType.MultiSelect || userFilter.OperatorType?.identifier2 === FilterType.AutoCompleteMulti) {
              values = userFilterValue?.map((multiSelectValue) => multiSelectValue.value?.toString());
            } else if (userFilter.OperatorType?.identifier2 === FilterType.DateFilter) {
              if (moment.isMoment(userFilterValue)) {
                values.push(userFilterValue.format(this.dateFormat));
              } else if (userFilter.OperatorType.value === 'Between') {
                const startValue = userFilterValue?.start ? userFilterValue?.start.format('YYYY-MM-DD HH:mm:ss') : userFilterValue[0];
                const endValue = userFilterValue?.end ? userFilterValue?.end.format('YYYY-MM-DD HH:mm:ss') : userFilterValue[1];
                values = [startValue, endValue];
              }
            }
          });
          userFilterCriteria.push({
            PublicFieldName: userFilter.PublicFieldName?.value,
            OperatorType: userFilter.OperatorType?.value,
            Values: values,
          });
        }
      });
      return {
        Name: this.formGroup.getRawValue().Name,
        ProjectGridFilterId: this.existingFilterProjectID,
        UserFilters: userFilterCriteria,
      };
    }
    return null;
  }

  private saveFilterValue(saveOnly: boolean = false): void {
    const filterDataRequest = this.transformFilter();
    this.gridFilterService.createUpdateUserFilter(filterDataRequest).subscribe(
      (response) => {
        this.dialogRef.close();
        if (saveOnly) {
          return;
        }
        if (!filterDataRequest.ProjectGridFilterId) {
          this.gridFilterService.applyUserFilter({
            ...filterDataRequest,
            ProjectGridFilterId: response.ProjectGridFilterCreatedId,
          });
        } else {
          this.gridFilterService.applyUserFilter(filterDataRequest);
        }
      },
      (validationErrors) => {
        validationErrors.forEach((validationError) => {
          if (validationError.ErrorCode === 'Duplicate') {
            this.gridFilterService.getUserFilters();
            this.invalidPatternMessage = validationError.DisplayMessage;
          }
        });
      },
    );
  }

  // ----- Methods called by template -----

  /**
   * Closes the dialog
   */
  public handleClickCancel(): void {
    this.dialogRef.close(false);
  }

  /**
   * Closes the dialog and returns user filter object to the dialog owner.
   */
  public handleClickSave(): void {
    if (!this.formGroup.valid) return;

    if (this.applyFilterText === 'Apply') {
      this.dialogRef.close();
      this.NameFormControl.setValue('Custom Filter', { emitEvent: false });
      this.existingFilterProjectID = 0;
      this.gridFilterService.applyUserFilter(this.transformFilter());
    } else if (this.applyFilterText === 'Save') {
      this.saveFilterValue(true);
    } else {
      this.handleClickSaveApply();
    }
  }

  /**
   * Closes the dialog and returns user filter object to the dialog owner.
   */
  public handleClickSaveApply(): void {
    if (!this.formGroup.valid) return;
    if (this.existingFilterProjectID > -1) {
      const dialogRef = this.dialog.open(ConfirmationModalComponent, {
        disableClose: true,
        width: '500px',
        panelClass: 'grid-filter-confirmation',
        data: {
          title: 'Are you sure want to replace the existing filter?',
          headerIconTray: this.headerIconTray,
          dialogMessage: `<div class="dialog-message--bold"> ${this.NameFormControl.value} </div>This action can't be undone.`,
          confirmText: 'Continue',
        },
      });

      dialogRef.afterClosed().subscribe((response) => {
        if (response) {
          this.saveFilterValue();
        }
      });
    } else {
      this.saveFilterValue();
    }
  }

  public addUserFilter(userFilterCriteria?: any) {
    let publicFieldNameValue: FilterOperator<any>;
    let operatorTypeValue: FilterOperator<any>;
    let controlValues = [];
    const filterObservables = [];
    this.retryAddingUserFilter = false;

    if (userFilterCriteria) {
      this.options.find((option: FilterOperator<any>) => {
        if (option.value === userFilterCriteria.PublicFieldName) {
          publicFieldNameValue = option;
          this.operators[option.identifier].find((operator: FilterOperator<any>) => {
            if (operator.value === userFilterCriteria.OperatorType) {
              operatorTypeValue = operator;
              this.values[option.identifier][operator.identifier]?.find((controlField: FilterOperator<any>[]) => {
                const controlFieldValues: FilterOperator<any>[] = [];
                controlField.find((controlFieldValue: FilterOperator<any>) => {
                  if (userFilterCriteria.Values.indexOf(controlFieldValue.value?.toString()) > -1) {
                    controlFieldValues.push(controlFieldValue);
                  }
                });
                if (operator.identifier2 === this.FilterTypeEnum.MultiSelect) {
                  controlValues.push(new UntypedFormControl(controlFieldValues));
                } else if (operator.identifier2 === this.FilterTypeEnum.AutoCompleteMulti) {
                  const filterValues = this.values[option.identifier][operator.identifier][0];
                  userFilterCriteria.Values.forEach((filterValue) => {
                    if (filterValues.findIndex((controlFieldValue) => controlFieldValue?.value?.toString() === filterValue?.toString()) < 0) {
                      filterObservables.push(this.gridFilterService.getFilterOptionData(filterValues[0].backendQueryUrl, filterValue));
                    }
                  });

                  if (filterObservables.length) {
                    forkJoin(filterObservables).subscribe((filteredOptions) => {
                      filteredOptions.forEach((filteredOption: any) => {
                        if (filterValues.findIndex((optionx) => optionx.value === filteredOption.value) < 0) {
                          filterValues.push(
                            new FilterOperator(filteredOption.key, filteredOption.value, filterValues[0].identifier, filterValues[0].identifier2, filterValues[0].backendQueryUrl),
                          );
                        }
                      });
                      this.addUserFilter(userFilterCriteria);
                    });
                    this.retryAddingUserFilter = true;
                  } else {
                    controlValues.push(new UntypedFormControl(controlFieldValues));
                  }
                } else if (operator.identifier2 === this.FilterTypeEnum.DateFilter) {
                  controlValues = [new UntypedFormControl(userFilterCriteria.Values)];
                } else {
                  controlValues.push(controlFieldValues);
                }
              });
            }
          });
        }
      });
    }

    if (operatorTypeValue?.identifier2 === this.FilterTypeEnum.AutoCompleteMulti && this.retryAddingUserFilter) return null;

    const userFilterGroup = this._formBuilder.group({
      PublicFieldName: [publicFieldNameValue, Validators.required],
      OperatorType: [operatorTypeValue, Validators.required],
      Values: this._formBuilder.array(controlValues),
    });

    this.UserFiltersFormControl.push(userFilterGroup);
    this.watchForValueChanges();
    this.changeDetectorRef.detectChanges();
  }

  public handleRowDeleted(rowIndex: number, event: any): void {
    event?.stopPropagation();
    this.UserFiltersFormControl.removeAt(rowIndex);
    if (this.UserFiltersFormControl.value.length === 0) {
      this.addUserFilter();
    }
  }

  public handleClearAll(): void {
    this.UserFiltersFormControl.clear();
    this.addUserFilter();
  }
}
