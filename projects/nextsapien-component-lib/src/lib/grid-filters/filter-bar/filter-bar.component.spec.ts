import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';

import { DebugElement } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { By } from '@angular/platform-browser';
import { FilterDataRequest } from '../../model/filter-data-request';
import { FilterDefinition } from '../../model/filter-definition';
import { UserFilter } from '../../model/user-filter';
import { TooltipModule } from '../../tooltip/tooltip.module';
import { GridFilterService } from '../services/grid-filter.service';
import { FilterBarComponent } from './filter-bar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormFieldModule } from '../../form-field/form-field.module';
import { CommonModule } from '@angular/common';

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

describe('FilterBarComponent', () => {
  let component: FilterBarComponent;
  let fixture: ComponentFixture<FilterBarComponent>;
  let debugElement: DebugElement;
  let gridFilterService: GridFilterService;

  Array.from({ length: 5 }, (_, id) => generateGridFilter(id));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilterBarComponent],
      imports: [
        CommonModule,
        NoopAnimationsModule,
        TooltipModule,
        ReactiveFormsModule,
        FormFieldModule,

        MatDialogModule,
        MatDividerModule,
        MatFormFieldModule,
        MatMenuModule,
        MatChipsModule,
      ],
      providers: [{ provide: MAT_DIALOG_DATA, useValue: {} }, { provide: MatDialogRef, useValue: { close: () => null } }, GridFilterService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterBarComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    gridFilterService = TestBed.inject(GridFilterService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(gridFilterService).toBeTruthy();
  });

  it("'No filters applied' should be displayed", () => {
    fixture.detectChanges();
    expect(component.filters.length).toBe(0);
    expect(component.savedFilters.length).toBe(0);
    expect(component.standardFilters.length).toBe(0);
    expect(debugElement.query(By.css('.chip_list'))).toBeFalsy();
    expect(component.savedFilters.length).toBe(0);
  });

  it('correct filter name should be displayed', () => {
    gridFilterService.filterDefinitions = gridFilterDefinitions;
    gridFilterService.userFiltersList = filterDataRequests;
    gridFilterService.getGridFilterDefinations();
    gridFilterService.getUserFilters();
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.userFiltersList.length).toBe(5);
    expect(component.userFiltersList).toBe(filterDataRequests);

    gridFilterService.applyUserFilter(filterDataRequests[0]);
    fixture.detectChanges();
    debugElement = fixture.debugElement;
    fixture.changeDetectorRef.detectChanges();
    expect(component.activeFilter.ProjectGridFilterId).toBe(filterDataRequests[0].ProjectGridFilterId);

    jest.spyOn(component, 'removeAllFilters');
    debugElement.query(By.css('.chip_list-wrapper-text--sufix span')).nativeElement.click();
    expect(component.removeAllFilters).toHaveBeenCalledTimes(1);
    fixture.detectChanges();
  });

  it('grid filter modal should open', () => {
    jest.spyOn(component, 'handleOpenFilterModal');
    debugElement.query(By.css('.filters-button')).nativeElement.click();
    expect(component.handleOpenFilterModal).toHaveBeenCalledTimes(1);
  });
});
