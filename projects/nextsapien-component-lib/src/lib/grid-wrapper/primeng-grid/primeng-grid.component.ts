import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';

import { select, Store } from '@ngrx/store';
import { MenuItem } from 'primeng/api';
import { finalize, Observable, Subject, takeUntil, tap } from 'rxjs';
import * as fromPaginator from '../../core/paginator/paginator-ngrx/reducers';
import { GridFilterService } from '../../grid-filters/services/grid-filter.service';
import { EditCompleteEvent } from '../../model/edit-complete-event';
import { FilterDataRequest } from '../../model/filter-data-request';
import { FilterDefinition } from '../../model/filter-definition';
import { GridColumn } from '../../model/grid-column';
import { GridDataRequest } from '../../model/grid-data-request';
import { GridRow } from '../../model/grid-row';
import { GridSortDirection } from '../../model/grid-sort-direction';
import { TranslationService } from '../../translation.service';

@Component({
  selector: 'lib-primeng-grid',
  templateUrl: './primeng-grid.component.html',
  styleUrls: ['./primeng-grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrimeNgGridComponent implements OnInit, OnDestroy {
  // public isEditInProgress: boolean = false;

  @Input() showDeletedItems: boolean = false;
  @Input() showTrashButton: boolean = false;
  @Input() columnDefs: GridColumn[];
  @Input() disableAdd: any;
  @Input() enableExport: any;
  @Input() title: string;
  @Input() enableCellTextSelection: boolean = true;
  @Input() loading$: Observable<boolean>;
  @Input() model: string;
  @Input() rowsPerPage: number = 25;
  @Input() rowsPerPageOptions: number[] = [1, 5, 10, 25, 50, 100];
  @Input() sortField: string = 'name';
  @Input() sortOrder: GridSortDirection = 'Ascending';
  @Input() groupByField: GridColumn = null;
  @Input() callbackFunction: (row: any) => MenuItem[];
  @Input()
  set rowData(rowData: any[]) {
    this.data = rowData.map((customer) => {
      const mapped: GridRow<any> = {
        id: Number(customer['_id']),
        data: customer,
        rowMenuItems: this.callbackFunction ? this.callbackFunction(customer) : [],
        hasEditPermissions: true,
      };
      return mapped;
    });
  }

  @Output() refreshData = new EventEmitter<any>();
  @Output() addData = new EventEmitter<any>();
  @Output() changeData = new EventEmitter<any>();
  @Output() exportEvent = new EventEmitter<any>();
  @Output() editComplete = new EventEmitter<any>();
  @Output() lazyLoad = new EventEmitter<any>();

  data: GridRow<any>[];
  totalRecords: number;
  loadEvent: GridDataRequest = null;
  selectedCurrencyCode = 'USD';
  userFiltersList: FilterDataRequest[] = [];
  filterDefinitions: FilterDefinition[] = [];
  standardFilters: FilterDataRequest[] = [];
  dateFormat = 'mm/dd/yyyy';
  noRowsText: string = '';
  isLoading: boolean = false;

  private componentDestroyed$: Subject<null> = new Subject();

  constructor(private translateService: TranslationService, private store: Store<fromPaginator.State>, private gridFilterService: GridFilterService) {}

  ngOnInit() {
    this.store.pipe(select(fromPaginator.selectPaginators)).subscribe((state) => {
      this.totalRecords = state[this.model];
    });

    this.changeGridLocal(this.translateService.currentLang);
    this.translateService.onLangChange.subscribe(() => {
      this.changeGridLocal(this.translateService.currentLang);
    });

    this.loading$.pipe(
      tap((res: any) => (this.isLoading = true)),
      finalize(() => {
        this.isLoading = false;
      }),
      takeUntil(this.componentDestroyed$),
    );
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next(null);
    this.componentDestroyed$.complete();
  }

  public handleLazyLoad(event: GridDataRequest) {
    this.lazyLoad.emit(event);
    this.sortField = event.sortField;
    this.sortOrder = event.sortDirection;
    this.loadEvent = event;
  }

  public refresh = (): void => this.refreshData.emit();

  public add = (): void => (this.disableAdd ? null : this.addData.emit());

  public toggleTrashItems(): void {
    if (this.showTrashButton) {
      this.showDeletedItems = !this.showDeletedItems;
      this.changeData.emit();
    }
  }

  public onBtExport = () => {
    // const colKeys = this.params.columnApi.columnModel.displayedColumns
    //   .filter((item: any) => item.colId !== 'action')
    //   .map((item: any) => {
    //     if (item.colId !== 'action') return item.colId;
    //   });
    // this.exportEvent.emit({
    //   gridApi: this.params.api,
    //   fileName: this.title,
    //   columnKeys: colKeys,
    // });
  };

  public handleEditComplete(event: EditCompleteEvent): void {
    this.editComplete.emit(event);
  }

  public handleEditChange(isEditInProgress: boolean): void {
    // this.isEditInProgress = isEditInProgress;
  }

  private updateNoRowTemplate(): void {
    this.translateService.get('ADMIN.AG_GRID.THERE_IS_NO_DATA_YET').subscribe((res) => {
      this.noRowsText = `${res}`;
      if (this.rowData && this.rowData.length === 0) {
        this.refresh(); // only refresh when there is no data to avoid reload of data everytime
      }
    });
  }

  private changeGridLocal(lang: string): void {
    this.updateNoRowTemplate();
  }
}
