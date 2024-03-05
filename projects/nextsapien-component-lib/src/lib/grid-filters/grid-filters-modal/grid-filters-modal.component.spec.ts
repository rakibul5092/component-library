import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { CommonModule, DecimalPipe } from '@angular/common';
import { DebugElement } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { By } from '@angular/platform-browser';
import { FilterDataRequest } from '../../model/filter-data-request';
import { FilterDefinition } from '../../model/filter-definition';
import { UserFilter } from '../../model/user-filter';
import { FormFieldModule } from '../../form-field/form-field.module';
import { SearchBarModule } from '../../search-bar/search-bar.module';
import { TooltipModule } from '../../tooltip/tooltip.module';
import { SelectFilterComponent } from '../select-filter/select-filter.component';
import { GridFilterService } from '../services/grid-filter.service';
import { GridFiltersModalComponent } from './grid-filters-modal.component';

const filterDataRequests: FilterDataRequest[] = [];
const gridFilterDefinitions: FilterDefinition[] = [];

const generateGridFilter = (id: number) => {
  const userFiltersList: UserFilter[] = [];

  userFiltersList.push({
    PublicFieldName: `PublicFieldName${id}`,
    OperatorType: `Operator${id}`,
    Values: [`Key ${id}`],
  });

  gridFilterDefinitions.push({
    PublicFieldName: `PublicFieldName${id}`,
    Label: `Label ${id}`,
    DisplayedToUser: true,
    FilterCriterias: [
      {
        Operator: {
          Label: 'Is Empty',
          Value: 'IsEmpty',
        },
        FilterParameters: [],
      },
      {
        Operator: {
          Label: `Operator_Label ${id}`,
          Value: `Operator${id}`,
        },
        FilterParameters: [
          {
            Label: '',
            InitialValue: '',
            ControlType: 'SingleSelect',
            ApiQueryUrl: '',
            Separator: 'Or',
            Values: [
              {
                Key: `Key ${id}`,
                Value: `Value_Label ${id}`,
              },
            ],
          },
        ],
      },
    ],
  });

  filterDataRequests.push({
    Name: `Name ${id}`,
    ProjectGridFilterId: id,
    UserFilters: userFiltersList,
  });
};

describe('GridFiltersModalComponent', () => {
  let component: GridFiltersModalComponent;
  let fixture: ComponentFixture<GridFiltersModalComponent>;
  let debugElement: DebugElement;
  let gridFilterService: GridFilterService;

  Array.from({ length: 5 }, (_, id) => generateGridFilter(id));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GridFiltersModalComponent, SelectFilterComponent],
      imports: [CommonModule, NoopAnimationsModule, FormsModule, ReactiveFormsModule, MatDialogModule, MatSelectModule, FormFieldModule, TooltipModule, SearchBarModule],
      providers: [{ provide: MAT_DIALOG_DATA, useValue: {} }, { provide: MatDialogRef, useValue: { close: () => null } }, DecimalPipe, GridFilterService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridFiltersModalComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    gridFilterService = TestBed.inject(GridFilterService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open the modal in the create mode', () => {
    expect(component.mode).toBe('create');
    expect(component.activeUserFilter).toBe(null);
    expect(component.applyFilterText).toBe('Apply');
    expect(component.formGroup.get('SaveFilter')?.value).toBeFalsy();
    expect(component.NameFormControl.value).toBe('Custom Filter');
    expect(component.NameFormControl.disabled).toBeTruthy();
  });

  it('save filter checkbox should work as expected', () => {
    debugElement.query(By.css('.filter-dialog__body-field--save input')).nativeElement.click();
    expect(component.formGroup.get('SaveFilter')?.value).toBeTruthy();
    expect(component.applyFilterText).toBe('Apply & Save');

    debugElement.query(By.css('.filter-dialog__body-field--save input')).nativeElement.click();
    expect(component.formGroup.get('SaveFilter')?.value).toBeFalsy();
    expect(component.applyFilterText).toBe('Apply');
  });

  it('add filter and clear all button should work as expected', () => {
    expect(component.UserFiltersFormControl.value.length).toBe(1);
    debugElement.query(By.css('.filter-dialog__row-add-button')).nativeElement.click();
    expect(component.UserFiltersFormControl.value.length).toBe(2);

    expect(debugElement.query(By.css('.filter-dialog__header-clear-all')).nativeElement.classList).toContain('filter-dialog__header-clear-all--disabled');
    component.enableClearAll = true;
    debugElement.query(By.css('.filter-dialog__header-clear-all')).nativeElement.click();
    expect(component.UserFiltersFormControl.value.length).toBe(1);
  });

  it('should be able to create a new filter out of the existing one', () => {
    gridFilterService.filterDefinitions = gridFilterDefinitions;
    gridFilterService.userFiltersList = filterDataRequests;
    gridFilterService.getGridFilterDefinations();
    gridFilterService.getUserFilters();
    gridFilterService.applyUserFilter(filterDataRequests[0]);
    component.ngOnInit();
    fixture.detectChanges();

    expect(component.userFiltersList.length).toBe(5);
    expect(component.userFiltersList).toBe(filterDataRequests);

    expect(component.NameFormControl.value).toBe('Name 0');
    expect(component.UserFiltersFormControl.value[0].PublicFieldName.label).toBe('Label 0');
    expect(component.UserFiltersFormControl.value[0].OperatorType.label).toBe('Operator_Label 0');
    expect(component.UserFiltersFormControl.value[0].Values.length).toBe(1);
    expect(component.UserFiltersFormControl.value[0].Values[0].label).toBe('Value_Label 0');

    expect(component.applyFilterText).toBe('Apply');
    expect(component.formGroupValueChanged).toBeFalsy();

    component.addUserFilter();
    expect(component.UserFiltersFormControl.value.length).toBe(2);

    debugElement.queryAll(By.css('.filter-dialog__row--suffix'))[1].nativeElement.click();
    expect(component.UserFiltersFormControl.value.length).toBe(1);

    component.NameFormControl.setValue('Custom Filter 2');
    fixture.detectChanges();
    fixture.changeDetectorRef.detectChanges();
    debugElement.query(By.css('.filter-dialog__save-button')).nativeElement.click();
    expect(component.userFiltersList.length).toBe(6);
  });
});
