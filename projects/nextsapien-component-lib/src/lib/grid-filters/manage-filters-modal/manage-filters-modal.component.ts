import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FilterDataRequest } from '../../model/filter-data-request';

import { ItemActionHandler } from '../../model/item-action-handler';
import { ConfirmationModalComponent } from '../../confirmation-modal/confirmation-modal.component';
import { GridFiltersModalComponent } from '../grid-filters-modal/grid-filters-modal.component';
import { GridFilterService } from '../services/grid-filter.service';

@Component({
  selector: 'lib-manage-filters-modal',
  templateUrl: './manage-filters-modal.component.html',
  styleUrls: ['./manage-filters-modal.component.scss'],
})
export class ManageFiltersModalComponent implements OnInit, OnDestroy {
  public userFiltersList: FilterDataRequest[] = [];
  public originalUserFilters: FilterDataRequest[];
  public headerIconTray: ItemActionHandler[] = [];

  private componentDestroyed$: Subject<null> = new Subject();

  constructor(
    private dialogRef: MatDialogRef<ManageFiltersModalComponent>,
    private dialog: MatDialog,
    private domSanitizer: DomSanitizer,
    private gridFilterService: GridFilterService,
  ) {
    this.gridFilterService.gridFilters.pipe(takeUntil(this.componentDestroyed$)).subscribe((userFiltersList) => {
      this.userFiltersList = userFiltersList;
    });
  }

  ngOnInit(): void {
    this.headerIconTray.push(
      new ItemActionHandler(this.domSanitizer.bypassSecurityTrustHtml('<i class="icon-gen3-warning"></i>'), null, this.domSanitizer.bypassSecurityTrustHtml('test')),
    );
    this.originalUserFilters = this.userFiltersList;
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next(null);
    this.componentDestroyed$.complete();
  }

  // ----- Methods called by template -----

  public handleClose(): void {
    this.dialogRef.close(true);
  }

  public drop(event: CdkDragDrop<string[]>) {
    const previousColumn = this.userFiltersList[event.currentIndex - 1];
    moveItemInArray(this.userFiltersList, event.previousIndex, event.currentIndex);
    const currentIdx = previousColumn ? event.currentIndex : 0;
    const movedColumn = this.userFiltersList[event.currentIndex];
    const originalColumnIndex = this.originalUserFilters.findIndex((x) => x.ProjectGridFilterId === movedColumn.ProjectGridFilterId);
    moveItemInArray(this.originalUserFilters, originalColumnIndex, currentIdx);
  }

  public handleApplyFilter(filterDataRequest: FilterDataRequest): void {
    this.gridFilterService.applyUserFilter(filterDataRequest);
  }

  public handleEditFilter(filterDataRequest: FilterDataRequest): void {
    this.dialog.open(GridFiltersModalComponent, {
      disableClose: true,
      width: '750px',
      minHeight: '500px',
      maxHeight: '750px',
      data: filterDataRequest,
    });
  }

  public handleDeleteFilter(filter: FilterDataRequest): void {
    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      disableClose: true,
      width: '500px',
      data: {
        title: 'Are you sure want to delete filter?',
        headerIconTray: this.headerIconTray,
        dialogMessage: `<div class="dialog-message--bold">${filter.Name}</div>This action can't be undone.`,
        confirmText: 'Continue',
      },
    });

    dialogRef.afterClosed().subscribe((response) => {
      if (response) {
        const filterIndex = this.userFiltersList.findIndex((userFilter) => userFilter.ProjectGridFilterId === filter.ProjectGridFilterId);
        this.gridFilterService.deleteUserFilter(filterIndex);
      }
    });
  }
}
