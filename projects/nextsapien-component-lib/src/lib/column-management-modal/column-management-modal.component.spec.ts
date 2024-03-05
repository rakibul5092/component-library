import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GridColumn } from '../model/grid-column';
import { SearchBarModule } from '../search-bar/search-bar.module';
import { TooltipModule } from '../tooltip/tooltip.module';
import { ColumnManagementModalComponent } from './column-management-modal.component';

describe('ColumnManagementModalComponent', () => {
  let component: ColumnManagementModalComponent;
  let fixture: ComponentFixture<ColumnManagementModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ColumnManagementModalComponent],
      imports: [MatCheckboxModule, SearchBarModule, TooltipModule],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            columns: [
              { name: 'id', label: 'ID', visible: true, groupName: 'Group1' },
              { name: 'name', label: 'Name', visible: true, groupName: 'Group1' },
              { name: 'test', label: 'Test Column', visible: true, groupName: 'Group2' },
              { name: 'city', label: 'City', visible: false, groupName: 'Group2' },
            ] as GridColumn[],
          },
        },
        { provide: MatDialogRef, useValue: {} },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColumnManagementModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('leftColumnGroups should contain only 2 groups', () => {
    expect(component.leftColumnGroups.length).toBe(2);
  });

  it('rightColumns should only contain visible columns', () => {
    expect(component.rightColumns.length).toBe(3);
  });

  it('handleSearchStringChange should only return the group with the test column', () => {
    component.handleSearchStringChange('test');
    expect(component.leftColumnGroups[0].columns[0].name).toBe('test');
  });

  it('handleCheck should remove name from rightColumns', () => {
    component.handleCheck(component.leftColumnGroups[0].columns[1]);
    expect(component.rightColumns.length).toBe(2);
  });

  it('handleCheck should add city to rightColumns', () => {
    component.handleCheck(component.leftColumnGroups[1].columns[1]);
    expect(component.rightColumns.length).toBe(4);
  });

  it('no columns message should display when there are no columns', () => {
    component.rightColumns = [];
    fixture.detectChanges();
    const el = fixture.nativeElement.querySelector('.no-columns');
    expect(el).toBeDefined();
  });

  it('no results message should display', () => {
    component.handleSearchStringChange('does not exist');
    fixture.detectChanges();
    const el = fixture.nativeElement.querySelector('.no-results');
    expect(el).toBeDefined();
  });

  it('drop should rearrange test column to be at the beginning', () => {
    component.drop({
      previousIndex: 2,
      currentIndex: 0,
    } as any);

    expect(component.rightColumns[0].name).toBe('test');
  });
});
