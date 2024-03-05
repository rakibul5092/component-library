import { moveItemInArray } from '@angular/cdk/drag-drop';
import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { cloneDeep } from 'lodash';
import { LazyLoadEvent, MenuItem } from 'primeng/api';
import { BehaviorSubject, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, takeUntil } from 'rxjs/operators';
import { ColumnManagementData, ColumnManagementModalComponent } from '../column-management-modal/column-management-modal.component';
import { GridFilterService } from '../grid-filters/services/grid-filter.service';
import { EditCompleteEvent, PrimeNgEditEvent } from '../model/edit-complete-event';
import { EditorWrapperComplete } from '../model/editor-wrapper-complete';
import { FilterDataRequest } from '../model/filter-data-request';
import { FilterDefinition } from '../model/filter-definition';
import { GridColumn } from '../model/grid-column';
import { GridColumnChange } from '../model/grid-column-change';
import { GridDataRequest } from '../model/grid-data-request';
import { GridFilterConfig } from '../model/grid-filter-config';
import { GridRow } from '../model/grid-row';
import { GridSortDirection } from '../model/grid-sort-direction';
import { ItemInfoLine } from '../model/item-info-line copy';
import { ItemSummary } from '../model/item-summary';
import { SelectOption } from '../model/select-option';
import { GetDisplayValuePipe } from '../pipes/get-display-value/get-display-value.pipe';
import { UserFilter } from './../model/user-filter';
import { EditorWrapperComponent } from './editor-wrapper/editor-wrapper.component';

@Component({
  selector: 'lib-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridComponent implements OnInit, OnChanges, OnDestroy {
  readonly defaultRowPerPageOptions: number[] = [10, 25, 50];
  readonly defaultRowsPerPage = 25;

  @Input() enableGridFilters = false;
  @Input() isLoading = false;
  @Input() totalRecords = null;
  @Input() rowsPerPage = this.defaultRowsPerPage;
  @Input() first = 0;
  @Input() rowsPerPageOptions: number[] = this.defaultRowPerPageOptions;
  @Input() paginatorDataTypeLabel = 'Records';
  @Input() currencyDisplayCode: string = 'USD';
  @Input() set sortField(value: string) {
    // Sometimes the consumer will set this to a value which
    // does not directly correspond to a column name, which
    // the grid really does not like, so we have to clear up
    // that discrepancy here.
    value ? (this.parsedSortField = this.allColumns?.find((c) => c.defaultSortColumn == value)?.name ?? value) : null;
  }
  get sortField(): string {
    return this.parsedSortField;
  }
  @Input() groupByField: GridColumn = null;
  @Input() gridFilterConfig: GridFilterConfig;
  @Input()
  set sortOrder(value: GridSortDirection) {
    this.parsedSortOrder = value === 'Ascending' ? 1 : value === 'Descending' ? -1 : null;
    this.createMenuItems(!!this.groupByField);
  }
  get sortOrder(): GridSortDirection {
    if (this.parsedSortOrder > 0) {
      return 'Ascending';
    }
    return this.parsedSortOrder < 0 ? 'Descending' : null;
  }
  @Input()
  set columns(columns: GridColumn[]) {
    this.allColumns = columns ?? [];
    this.filteredColumns = (columns ?? []).filter((c) => c.visible);
    this.calculateNumberAndPositionOfPinnedColumns();
  }
  get columns(): GridColumn[] {
    return this.allColumns ?? [];
  }
  @Input() set data(data: GridRow<any>[]) {
    this.processDisplayValues(data);
    if (!this.totalRecords) {
      this.totalRecords = data?.length;
    }
    if (this.columns?.length) {
      this.isLoading = false;
    }
    if (this.didPaginate) {
      setTimeout(() => {
        const els = this.getBtnElements();

        els.forEach((x) => {
          if (this.allRowsExpanded && !x.classList.contains('expanded')) {
            x.click();
          } else if (!this.allRowsExpanded && x.classList.contains('expanded')) {
            x.click();
          }
        });
      }, 200);
    } else if (this.groupByField) {
      this.expandAllGroups();
    }
  }
  get data(): GridRow<any>[] {
    return this.processedData;
  }

  @Input() filterDefinitions: FilterDefinition[] = [];
  @Input() userFiltersList: FilterDataRequest[] = [];
  @Input() dateFormat: string;
  @Input() maxPinnedColumns = 3;
  @Input() errorInlineMode = false;

  @Output() lazyLoad = new EventEmitter<GridDataRequest>();
  @Output() columnsChange = new EventEmitter<GridColumnChange>();
  @Output() editComplete = new EventEmitter<EditCompleteEvent>();
  @Output() editChange = new EventEmitter<boolean>();

  public display = true;
  public processedData: GridRow<any>[] = [];
  public filteredColumns: GridColumn[] = [];
  public parsedSortOrder: number | null;
  public editFormControl: UntypedFormControl = new UntypedFormControl(null);
  public editSelectOptions: SelectOption<string | number | boolean>[] = [];
  public totalNumberOfPinnedColumns = 0;
  public columnManagementModalOpen = false;
  public expanded = true;
  public isEditInProgress = false;
  public allRowsExpanded = false;

  private parsedSortField: string;
  private allColumns: GridColumn[] = [];
  private searchString: string;
  private searchStringSubject: Subject<string> = new Subject();
  private componentDestroyed$: Subject<null> = new Subject();
  private userFilter: UserFilter[];
  private lastChangedFieldValue;
  private didPaginate = false;

  constructor(
    private dialog: MatDialog,
    private changeDetectorRef: ChangeDetectorRef,
    private gridFilterService: GridFilterService,
    private getDisplayValuePipe: GetDisplayValuePipe,
    private currencyPipe: CurrencyPipe,
  ) {}

  ngOnInit() {
    this.validateConfig();
    this.searchStringSubject
      .asObservable()
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this.componentDestroyed$),
        filter((searchString) => searchString.length === 0 || searchString.length > 1),
      )
      .subscribe((searchString) => {
        this.searchString = searchString;
        this.first = 0;
        this.emitLazyLoad();
      });
    this.createMenuItems(!!this.groupByField);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.['dateFormat']) {
      this.dateFormat = (changes?.['dateFormat'].currentValue || 'MM/DD/YYYYY').toUpperCase();
      this.gridFilterService.dateFormat = this.dateFormat;
    }
    if (changes?.['gridFilterConfig']) {
      this.gridFilterService.gridFilterConfig = changes['gridFilterConfig'].currentValue;
      this.gridFilterService.getGridFilterDefinations();
      this.gridFilterService.getUserFilters();
    }
    if (changes?.['filterDefinitions']) {
      this.gridFilterService.filterDefinitions = changes['filterDefinitions'].currentValue;
      this.gridFilterService.getGridFilterDefinations();
    }
    if (changes?.['userFiltersList']) {
      this.gridFilterService.userFiltersList = changes['userFiltersList'].currentValue;
      this.gridFilterService.getUserFilters();
    }
    if (changes?.['currencyDisplayCode']) {
      const currencyDisplaySymbol = this.currencyPipe.transform(0, changes?.['currencyDisplayCode'].currentValue).split('0.00')[0] ?? '$';
      this.gridFilterService.setCurrencyDisplaySymbol(currencyDisplaySymbol);
      this.processDisplayValues(this.data);
    }
  }

  ngOnDestroy() {
    this.componentDestroyed$.next(null);
    this.componentDestroyed$.complete();
  }

  private processDisplayValues(data: GridRow<any>[]) {
    if (data && data.length) {
      data.forEach((row) => {
        Object.entries(row.data).forEach((entry: [string, any]) => {
          const col = this.allColumns.find((nextCol) => nextCol.name === entry[0]);
          this.setDisplayValue(col, row, entry[0]);
        });
      });
      this.processedData = data;
    } else {
      this.processedData = [];
    }
  }

  toggleAll() {
    const els = this.getBtnElements();

    els.forEach((x) => {
      if (this.allRowsExpanded && !x.classList.contains('expanded')) {
        // do nothing, it's already collapsed
      } else if (!this.allRowsExpanded && x.classList.contains('expanded')) {
        // do nothing, it's already expanded
      } else {
        x.click();
      }
    });

    this.allRowsExpanded = !this.allRowsExpanded;
  }

  private setDisplayValue(col: GridColumn, row: GridRow<any>, fieldName: string): void {
    if (!row.displayValues) {
      row.displayValues = {};
    }
    row.displayValues[fieldName] = this.getDisplayValuePipe.transform(row.data?.[col?.name], col, this.dateFormat, this.currencyDisplayCode);
  }

  public isArray(data: any) {
    return Array.isArray(data);
  }

  public onLazyLoad(event: LazyLoadEvent) {
    this.parsedSortOrder = event.sortOrder;
    this.sortField = event.sortField;
    this.first = 0;
    this.emitLazyLoad();
  }

  public handleSearchStringChange(query: string) {
    this.searchStringSubject.next(query);
  }

  public paginate(event: LazyLoadEvent) {
    this.didPaginate = true;
    this.first = event.first;
    this.rowsPerPage = event.rows;
    this.emitLazyLoad();
  }

  private emitLazyLoad() {
    const request: GridDataRequest = {
      from: this.first,
      size: this.rowsPerPage,
      userFilters: this.userFilter,
      sortField: this.allColumns?.find((c) => c.name == this.sortField)?.defaultSortColumn ?? this.sortField,
      sortDirection: this.sortOrder,
      groupByField: this.allColumns?.find((c) => c.name == this.groupByField?.name)?.defaultSortColumn ?? this.groupByField?.name,
      searchString: this.searchString,
    };
    this.lazyLoad.emit(request);
  }

  private validateConfig() {
    this.rowsPerPage = this.rowsPerPage ?? this.rowsPerPageOptions?.[0] ?? this.defaultRowsPerPage;

    // add the provided rowsPerPage number to the rowsPerPageOptions dropdown (if necessary)
    if (this.rowsPerPageOptions?.every((option) => option !== this.rowsPerPage)) {
      this.rowsPerPageOptions.unshift(this.rowsPerPage);
    }

    this.rowsPerPageOptions = this.rowsPerPageOptions?.sort((a, b) => a - b);
  }

  private createMenuItems(ungroup = false) {
    this.allColumns.forEach((column) => {
      const menuItems: MenuItem[] = [
        {
          label: column.pinned ? 'Unpin' : 'Pin',
          icon: 'icon-pin',
          styleClass: column.pinned ? '' : 'pin-menu-item',
          command: (event) => {
            if (!column.pinned && this.totalNumberOfPinnedColumns >= this.maxPinnedColumns) {
              return;
            }
            column.pinned = !column.pinned;
            if (column.pinned) {
              event.item.label = 'Unpin';
              event.item.styleClass = '';
            } else {
              event.item.styleClass = 'pin-menu-item';
            }
            this.filterGridColumns();
            this.calculateNumberAndPositionOfPinnedColumns();
            this.columnsChange.emit({ columns: this.allColumns, groupByField: this.groupByField });
          },
        },
      ];

      if (column.sortable) {
        menuItems.push({
          label: ungroup ? 'Ungroup Grid' : 'Group by this field',
          icon: 'icon-group-by',
          command: () => {
            if (ungroup) {
              const field = this.allColumns.find((x) => x.name === this.groupByField.name);
              if (field) {
                field.visible = true;
              }
              this.groupByField = null;
              this.filteredColumns = this.allColumns.filter((nextColumn) => nextColumn.visible);
            } else {
              column.pinned = false;
              column.visible = false;
              this.filteredColumns = this.filteredColumns.filter((col) => col.visible);
              this.groupByField = column;
            }
            this.createMenuItems(!ungroup);
            this.display = false;
            this.changeDetectorRef.detectChanges();
            this.display = true;
            this.changeDetectorRef.detectChanges();
            this.calculateNumberAndPositionOfPinnedColumns();
            this.columnsChange.emit({ groupByField: this.groupByField, columns: this.allColumns });
          },
        } as MenuItem);
      }

      menuItems.push({
        label: 'Remove',
        icon: 'icon-remove',
        command: () => {
          column.visible = false;
          this.filteredColumns = this.filteredColumns.filter((col) => col.visible);
          this.changeDetectorRef.detectChanges();
          this.columnsChange.emit({ groupByField: this.groupByField, columns: this.allColumns });
        },
      } as MenuItem);

      if (column.sortable) {
        menuItems.push({ separator: true } as MenuItem);

        menuItems.push({
          label: 'Sort Ascending',
          icon: 'icon-long-arrow-up',
          styleClass: this.sortOrder === 'Ascending' && this.sortField === column.name ? 'selected' : '',
          command: () => {
            this.sortField = column.name;
            this.sortOrder = 'Ascending';
            this.first = 0;
          },
        } as MenuItem);

        menuItems.push({
          label: 'Sort Descending',
          icon: 'icon-long-arrow-down',
          styleClass: this.sortOrder === 'Descending' ? 'selected' : '',
          command: () => {
            this.sortField = column.name;
            this.sortOrder = 'Descending';
            this.first = 0;
          },
        } as MenuItem);
      }

      column.menuItems = menuItems;
    });
  }

  public openManagementModal(): void {
    const dialogRef = this.dialog.open(ColumnManagementModalComponent, {
      disableClose: true,
      minWidth: '800px',
      maxHeight: '722px',
      data: {
        columns: cloneDeep(this.allColumns),
        // The groupByField column is nominally disabled for the purposes of grid rendering.
        // However, when we display the column management modal, we want it to "appear" enabled
        // so that the user is not confused ("why does it say if it's disabled if I'm grouping
        // by it right now?"). So we pass it in here so we can show it as enabled in the modal.
        groupByField: this.groupByField ?? {},
        maxPinnedColumns: this.maxPinnedColumns,
      } as ColumnManagementData,
    });

    this.columnManagementModalOpen = true;

    dialogRef.afterClosed().subscribe((gridColumnChange: GridColumnChange) => {
      if (gridColumnChange) {
        const columns = gridColumnChange.columns;
        this.groupByField = gridColumnChange.groupByField;
        this.emitLazyLoad();
        this.display = false;
        this.changeDetectorRef.detectChanges();
        this.display = true;
        if (columns && columns.length) {
          this.allColumns = columns;
          this.filteredColumns = gridColumnChange.filteredColumns;
          this.calculateNumberAndPositionOfPinnedColumns();
          this.columnsChange.emit({ columns, groupByField: this.groupByField });
        }
        this.createMenuItems(!!this.groupByField);
        this.columnManagementModalOpen = false;
        this.changeDetectorRef.detectChanges();
      }
    });
  }

  public handleEditComplete(event: PrimeNgEditEvent, bypass = false) {
    this.isEditInProgress = false;
    this.editChange.emit(this.isEditInProgress);
    this.changeDetectorRef.detectChanges();

    let value;

    if (this.lastChangedFieldValue?.en) {
      value = cloneDeep(this.lastChangedFieldValue);
      value.en = this.editFormControl.value;
    } else {
      value = this.editFormControl.value;
    }

    if (!Array.isArray(this.lastChangedFieldValue) && !Array.isArray(value) && this.lastChangedFieldValue === value) {
      return; // not emitting an event if the underlying data did not change
    }

    if (event.data.column.controlType !== 'Html' || bypass) {
      event.data.row.data = {
        ...event.data.row.data,
        [event.field]: value,
      };
      this.setDisplayValue(event.data.column, event.data.row, event.field);
      this.editComplete.emit(new EditCompleteEvent(event, this.lastChangedFieldValue));
    }
  }

  public handleEditInit(event: PrimeNgEditEvent) {
    const col = event.data.column;
    let value = event.data.row.data[event.field];
    if (Array.isArray(value) && col.controlType === 'SingleSelect') {
      value = value[0]; // handle possible mismatch between column definition and the actual grid data
    }

    this.lastChangedFieldValue = value;
    let prevValue = value;
    if (prevValue?.en) prevValue = prevValue?.en;
    this.editFormControl = new UntypedFormControl(prevValue);
    this.editSelectOptions = Array.isArray(col.values) ? col.values.map((v) => new SelectOption(v.Value, v.Key)) : [];
    if (col.controlType === 'Boolean') {
      this.editSelectOptions = [new SelectOption('Select one', null), new SelectOption('Yes', true), new SelectOption('No', false)];
    }

    if (col.controlType === 'AutoComplete') {
      if (col.apiUrl) {
        // when the apiUrl for the grid component is ready then we can
        // build and add the entity property that uses the http service
      } else {
        event.data.row.data.entity = [
          {
            // TODO: move this to this.editTypeaheadFunctions?
            searchFunction: (text: string) => new BehaviorSubject(['test 1', 'test 2']).asObservable(),
            mappingFunction: (text: string) => {
              return new BehaviorSubject(new ItemSummary(new ItemInfoLine(text, text, () => {}), [], [], []));
            },
            filterFunction: () => true,
            sortFunction: () => 1,
          },
        ];
      }
    } else if (col.controlType === 'Html') {
      this.openEditor(event);
    }
    this.isEditInProgress = true;
    this.editChange.emit(this.isEditInProgress);
    this.changeDetectorRef.detectChanges();
  }

  public handleEditCancel(event: PrimeNgEditEvent): void {
    this.isEditInProgress = false;
    this.editChange.emit(this.isEditInProgress);
    this.changeDetectorRef.detectChanges();
  }

  public openEditor(event: PrimeNgEditEvent): void {
    const dialogRef = this.dialog.open(EditorWrapperComponent, {
      disableClose: true,
      data: {
        formFieldControl: this.editFormControl,
        title: `Edit ${event.data.column.label}`,
      },
    });
    dialogRef.afterClosed().subscribe((result: EditorWrapperComplete) => {
      if (!result?.cancel) {
        this.handleEditComplete(event, true);
        this.filteredColumns[event.data.column.name] = result.value;
      }
    });
  }

  public handleUnpinColumn(column: GridColumn, event: any): void {
    column.pinned = !column.pinned;
    if (!column.pinned) {
      column.menuItems[0].label = 'Pin';
    }
    this.filterGridColumns();
    this.calculateNumberAndPositionOfPinnedColumns();
    event.stopPropagation();
    event.preventDefault();
    this.columnsChange.emit({ columns: this.allColumns, groupByField: this.groupByField });
  }

  public colReorder(event: { columns: GridColumn[]; dragIndex: number; dropIndex: number }): void {
    const firstUnpinnedColumnIndex = this.filteredColumns.findIndex((column, i) => i !== event.dropIndex && !column.pinned);
    if (event.dropIndex > firstUnpinnedColumnIndex && this.filteredColumns[event.dropIndex].pinned) {
      // If a pinned column was moved out of the pinned column area, mark it unpinned
      this.filteredColumns[event.dropIndex].pinned = false;
      this.calculateNumberAndPositionOfPinnedColumns();
    } else if (firstUnpinnedColumnIndex > 0 && event.dropIndex < firstUnpinnedColumnIndex - 1) {
      if (!this.filteredColumns[event.dropIndex].pinned && firstUnpinnedColumnIndex <= this.maxPinnedColumns) {
        // If an unpinned column was moved into the pinned column area and there is room
        // for another pinned column, pin it
        this.filteredColumns[event.dropIndex].pinned = true;
        this.calculateNumberAndPositionOfPinnedColumns();
        return;
      } else if (!this.filteredColumns[event.dropIndex].pinned) {
        moveItemInArray(this.filteredColumns, event.dropIndex, event.dragIndex);
        this.calculateNumberAndPositionOfPinnedColumns();
        return;
      }
    }

    this.calculateNumberAndPositionOfPinnedColumns();

    // Propagate the column reordering to the allColumns array, since the grid
    const reorderedColumnIndex = this.allColumns.findIndex((column) => column.name === this.filteredColumns[event.dropIndex].name);
    if (event.dropIndex !== 0) {
      let precedingColumnIndex = this.allColumns.findIndex((column) => column === this.filteredColumns[event.dropIndex - 1]);
      if (precedingColumnIndex < reorderedColumnIndex) {
        precedingColumnIndex += 1;
      }
      moveItemInArray(this.allColumns, reorderedColumnIndex, precedingColumnIndex);
    } else {
      moveItemInArray(this.allColumns, reorderedColumnIndex, 0);
    }
    this.columnsChange.emit({ groupByField: this.groupByField, columns: this.allColumns });
  }

  public colResize(event): void {
    const col = this.allColumns.find((nextCol) => nextCol.label === event.element.innerText);
    col.width = (col.width ?? 200) + event.delta;
    col.width = col.width >= 130 ? col.width : 130;
    this.calculateNumberAndPositionOfPinnedColumns();
    this.changeDetectorRef.detectChanges();
    this.columnsChange.emit({ groupByField: this.groupByField, columns: this.allColumns });
  }

  public calculateNumberAndPositionOfPinnedColumns(): void {
    this.totalNumberOfPinnedColumns = this.filteredColumns.filter((column) => column.pinned).length;
    let position = 30;
    this.filteredColumns.forEach((column, index) => {
      if (index > 0) {
        position += this.filteredColumns[index - 1].width ?? 200;
      }
      column.pinLocationInPx = position;
    });
    this.createMenuItems(!!this.groupByField);
  }

  public handleApplyFilter(userFilter: FilterDataRequest) {
    if (!userFilter || Object.keys(userFilter).length < 1) {
      this.userFilter = [];
    } else {
      if (userFilter.UserFilters) {
        this.userFilter = userFilter.UserFilters;
      }
      if (userFilter.Sort?.Direction) {
        this.sortOrder = userFilter.Sort.Direction;
      }
      if (userFilter.Sort?.Field) {
        this.sortField = userFilter.Sort.Field;
      }
    }
    this.first = 0;
    this.emitLazyLoad();
  }

  private getBtnElements() {
    return document.querySelectorAll<HTMLButtonElement>('#expandBtn');
  }

  private expandAllGroups() {
    setTimeout(() => {
      const els = this.getBtnElements();
      els.forEach((x) => {
        x.click();
      });
      this.allRowsExpanded = true;
    }, 200);
  }

  private filterGridColumns(): void {
    const columnsCopy: GridColumn[] = cloneDeep(this.filteredColumns);
    this.filteredColumns = this.allColumns
      .filter((nextColumn) => nextColumn.visible)
      .sort((a, b) => {
        if (a.pinned && b.pinned) {
          return columnsCopy.findIndex((k) => k.name === a.name) - columnsCopy.findIndex((k) => k.name === b.name);
        }
        return a.pinned ? -1 : 1;
      });
  }
}
