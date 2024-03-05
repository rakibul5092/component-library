import { CommonModule, CurrencyPipe, DecimalPipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuModule } from 'primeng/menu';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { FormFieldModule } from '../form-field/form-field.module';
import { FilterBarComponent } from '../grid-filters/filter-bar/filter-bar.component';
import { GridFilterService } from '../grid-filters/services/grid-filter.service';
import { DateLocalizationPipe } from '../pipes/date-localization/date-localization.pipe';
import { GetDisplayValuePipe } from '../pipes/get-display-value/get-display-value.pipe';
import { SearchBarModule } from '../search-bar/search-bar.module';
import { TooltipModule } from '../tooltip/tooltip.module';
import { TranslationModule } from '../translation.module';
import { GridComponent } from './grid.component';

describe('GridComponent', () => {
  let component: GridComponent;
  let fixture: ComponentFixture<GridComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GridComponent, FilterBarComponent],
      imports: [
        BrowserAnimationsModule,
        CommonModule,
        FormFieldModule,
        MatDialogModule,
        MatDividerModule,
        MatMenuModule,
        MatSelectModule,
        MenuModule,
        PaginatorModule,
        SearchBarModule,
        TableModule,
        TooltipModule,
        TranslationModule,
        HttpClientTestingModule,
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
        GridFilterService,
        GetDisplayValuePipe,
        DateLocalizationPipe,
        DecimalPipe,
        CurrencyPipe,
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(GridComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should default to 25 rows per page', () => {
    expect(component.rowsPerPage).toBe(component.defaultRowsPerPage);
  });

  it('should default to [10, 25, 50] rowsPerPageOptions', () => {
    expect(component.rowsPerPageOptions).toEqual(component.defaultRowPerPageOptions);
  });

  it('should sort rowsPerPageOptions ascending', () => {
    component.rowsPerPage = undefined;
    component.rowsPerPageOptions = [4, 3, 5, 2, 1];
    component.ngOnInit();
    expect(component.rowsPerPageOptions).toEqual([1, 2, 3, 4, 5]);
  });

  it('should add the rowsPerPage value to rowsPerPageOptions (if it doesnt exist)', () => {
    component.rowsPerPage = 999;
    component.ngOnInit();
    expect(component.rowsPerPageOptions).toContain(999);
  });

  it('should set rowsPerPage to the 1st entry of rowsPerPageOptions if rowsPerPage is not provided', () => {
    component.rowsPerPage = undefined;
    component.rowsPerPageOptions = [1, 2, 3];
    component.ngOnInit();
    expect(component.rowsPerPage).toBe(1);
  });

  it('should only show visible columns', () => {
    const testColumns = [
      { name: 'Visible', visible: true },
      { name: 'NotVisible', visible: false },
    ];
    component.columns = testColumns;
    fixture.detectChanges();
    const headers = fixture.nativeElement.querySelectorAll('th.grid-cell');
    expect(headers.length).toBe(testColumns.filter((c) => c.visible).length);
  });

  it('should set totalRecords to the length of the data (if not already set)', () => {
    const testData = [
      ...Array.from({ length: 60 }, (_, id) => {
        return { data: id.toString() };
      }),
    ];
    component.data = testData;
    fixture.detectChanges();
    expect(component.totalRecords).toBe(testData.length);
  });

  it('should NOT set totalRecords to the length of the data (if already set)', () => {
    component.totalRecords = 1234;
    component.data = [];
    fixture.detectChanges();
    expect(component.totalRecords).toBe(1234);
  });

  it('should show pagination if totalRecords has been set', () => {
    component.totalRecords = 123;
    fixture.detectChanges();
    const paginator = fixture.nativeElement.querySelector('.paginator-container');
    expect(paginator).toBeTruthy();
  });

  it('should hide pagination if totalRecords/data has NOT been set', () => {
    fixture.detectChanges();
    const paginator = fixture.nativeElement.querySelector('.paginator-container');
    expect(paginator).toBeFalsy();
  });

  it('should reset pagination on search', fakeAsync(() => {
    component.first = 999;
    component.ngOnInit();
    component.handleSearchStringChange('test');
    tick(500); // search has a 500ms debounceTime
    expect(component.first).toBe(0);
  }));

  it('should reset pagination on filter application', () => {
    component.first = 999;
    component.handleApplyFilter({
      Name: 'Test',
      UserFilters: [],
    });
    expect(component.first).toBe(0);
  });

  it('should reset pagination on sort', () => {
    component.first = 999;
    component.onLazyLoad({});
    expect(component.first).toBe(0);
  });

  describe('Editing', () => {
    it('should start edit mode on click (column and row marked as editable)', () => {
      jest.spyOn(component, 'handleEditInit');
      component.columns = [{ name: 'Blah', visible: true, editable: true, controlType: 'Text' }];
      component.data = [{ data: { Blah: 'foo' }, hasEditPermissions: true }];
      fixture.detectChanges();
      fixture.debugElement.nativeElement.querySelector('.grid-cell-body').click(); // start edit mode
      expect(component.handleEditInit).toHaveBeenCalled();
    });

    it('should NOT be able to edit if row is marked as NOT editable', () => {
      jest.spyOn(component, 'handleEditInit');
      component.columns = [{ name: 'Blah', visible: true, editable: true, controlType: 'Text' }];
      component.data = [{ data: { Blah: 'foo' }, hasEditPermissions: false }];
      fixture.detectChanges();
      fixture.debugElement.nativeElement.querySelector('.grid-cell-body').click(); // start edit mode
      expect(component.handleEditInit).not.toHaveBeenCalled();
    });

    it('should NOT be able to edit if column is marked as NOT editable', () => {
      jest.spyOn(component, 'handleEditInit');
      component.columns = [{ name: 'Blah', visible: true, editable: false, controlType: 'Text' }];
      component.data = [{ data: { Blah: 'foo' }, hasEditPermissions: true }];
      fixture.detectChanges();
      fixture.debugElement.nativeElement.querySelector('.grid-cell-body').click(); // start edit mode
      expect(component.handleEditInit).not.toHaveBeenCalled();
    });
  });

  describe('SingleSelect', () => {
    it('should convert each column value to a select option', () => {
      const values = [
        { Key: 'foo', Value: 'foo' },
        { Key: 'bar', Value: 'bar' },
        { Key: 'baz', Value: 'baz' },
      ];
      component.columns = [{ name: 'Blah', visible: true, editable: true, controlType: 'SingleSelect', values }];
      component.data = [{ data: { Blah: 'foo' }, hasEditPermissions: true }];
      fixture.detectChanges();
      fixture.debugElement.nativeElement.querySelector('.grid-cell-body').click(); // start edit mode
      expect(component.editSelectOptions.length).toBe(values.length);
    });

    it('should be editable', () => {
      component.columns = [
        {
          name: 'Blah',
          visible: true,
          editable: true,
          controlType: 'SingleSelect',
          values: [{ Key: 'foo', Value: 'foo' }],
        },
      ];
      component.data = [{ data: { Blah: 'foo' }, hasEditPermissions: true }];
      fixture.detectChanges();
      fixture.debugElement.nativeElement.querySelector('.grid-cell-body').click(); // start edit mode
      expect(component.editFormControl.value).toBe('foo');
    });

    it('should be editable when data is an array', () => {
      component.columns = [
        {
          name: 'Blah',
          visible: true,
          editable: true,
          controlType: 'SingleSelect',
          values: [{ Key: 'foo', Value: 'foo' }],
        },
      ];
      component.data = [{ data: { Blah: ['foo', 'bar'] }, hasEditPermissions: true }];
      fixture.detectChanges();
      fixture.debugElement.nativeElement.querySelector('.grid-cell-body').click(); // start edit mode
      expect(component.editFormControl.value).toBe('foo');
    });
  });
});
