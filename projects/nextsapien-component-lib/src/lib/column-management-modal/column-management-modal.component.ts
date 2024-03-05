import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { cloneDeep } from 'lodash';
import { TooltipDirectionPreference } from '../enums/tooltip-direction-preference';
import { GridColumn } from '../model/grid-column';

interface GridColumnGroup {
  groupName: string;
  columns: GridColumn[];
  groupOrder?: number;
}

export type ColumnManagementData = {
  columns: GridColumn[];
  filteredColumns: GridColumn[];
  groupByField?: GridColumn;
  maxPinnedColumns?: number;
};

@Component({
  selector: 'cos-column-management-modal',
  templateUrl: './column-management-modal.component.html',
  styleUrls: ['./column-management-modal.component.scss'],
})
export class ColumnManagementModalComponent implements OnInit {
  leftColumnGroups: GridColumnGroup[] = [];
  originalLeftColumnGroups: GridColumnGroup[] = [];
  rightColumns: GridColumn[] = [];
  originalRightColumns: GridColumn[] = [];
  groupByField: GridColumn;
  toggleMap = {};
  queryString = '';
  tooltipDirection = TooltipDirectionPreference.Top;

  private maxPinnedColumns: number = 3;

  constructor(public dialogRef: MatDialogRef<ColumnManagementModalComponent>, @Inject(MAT_DIALOG_DATA) public data: ColumnManagementData) {
    this.groupByField = data.columns?.find((column) => column.name === data.groupByField?.name);
    this.leftColumnGroups = this.createColumnGroups(data.columns);
    this.originalRightColumns = data.columns;
    this.maxPinnedColumns = data.maxPinnedColumns;
  }

  private createColumnGroups(columns: GridColumn[]): GridColumnGroup[] {
    const mapped = [] as GridColumnGroup[];
    columns.forEach((column) => {
      const existing = mapped.find((mappedColumn) => mappedColumn.groupName === column.groupName);
      if (existing) {
        existing.columns.push(column);
      } else {
        mapped.push({ groupName: column.groupName, columns: [column], groupOrder: column.groupOrder } as GridColumnGroup);
      }
    });
    return mapped.sort((a, b) => a.groupOrder - b.groupOrder);
  }

  ngOnInit(): void {
    this.originalLeftColumnGroups = this.leftColumnGroups;
    this.filterGridColumns();
  }

  public handleClickCancel(): void {
    this.dialogRef.close();
  }

  public handleClickSave(): void {
    this.dialogRef.close({ groupByField: this.groupByField, columns: this.originalRightColumns, filteredColumns: this.rightColumns });
  }

  public handleSearchStringChange(query: string) {
    if (query.length > 0) {
      this.leftColumnGroups = [];
      this.originalLeftColumnGroups.forEach((columnGroup) => {
        const filteredColumnGroup: GridColumnGroup = { groupName: columnGroup.groupName, columns: [] };
        columnGroup.columns.forEach((column) => {
          if (column.label.toLowerCase().includes(query.toLowerCase())) {
            filteredColumnGroup.columns.push(column);
          }
        });
        if (filteredColumnGroup.columns.length) {
          this.leftColumnGroups.push(filteredColumnGroup);
        }
      });
    } else {
      this.leftColumnGroups = this.originalLeftColumnGroups;
    }
  }

  public handleCheck(column: GridColumn) {
    if (column.name === this.groupByField?.name) {
      this.groupByField = null;
    } else {
      column.visible = !column.visible;
    }
    this.filterGridColumns();
  }

  public drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.rightColumns, event.previousIndex, event.currentIndex);
    const firstUnpinnedColumnIndex = this.rightColumns.findIndex((column, i) => i !== event.currentIndex && !column.pinned);
    if (event.currentIndex > firstUnpinnedColumnIndex && this.rightColumns[event.currentIndex].pinned) {
      // If a pinned column was moved out of the pinned column area, mark it unpinned
      this.rightColumns[event.currentIndex].pinned = false;
    } else if (firstUnpinnedColumnIndex > 0 && event.currentIndex < firstUnpinnedColumnIndex - 1) {
      if (!this.rightColumns[event.currentIndex].pinned && firstUnpinnedColumnIndex <= this.maxPinnedColumns) {
        // If an unpinned column was moved into the pinned column area and there is room
        // for another pinned column, pin it
        this.rightColumns[event.currentIndex].pinned = true;
        return;
      } else if (!this.rightColumns[event.currentIndex].pinned) {
        moveItemInArray(this.rightColumns, event.currentIndex, event.previousIndex);
        return;
      }
    }

    const reorderedColumnIndex = this.originalRightColumns.findIndex((column) => column.name === this.rightColumns[event.currentIndex].name);
    if (event.currentIndex !== 0) {
      let precedingColumnIndex = this.originalRightColumns.findIndex((column) => column === this.rightColumns[event.currentIndex - 1]);
      if (precedingColumnIndex < reorderedColumnIndex) {
        precedingColumnIndex += 1;
      }
      moveItemInArray(this.originalRightColumns, reorderedColumnIndex, precedingColumnIndex);
    } else {
      moveItemInArray(this.originalRightColumns, reorderedColumnIndex, 0);
    }
  }

  public handleUnpin(column: GridColumn) {
    column.pinned = false;
    this.filterGridColumns();
  }

  public handleUngroup(): void {
    this.groupByField.visible = true;
    this.groupByField = null;
    this.filterGridColumns();
  }

  private filterGridColumns(): void {
    const columnsCopy: GridColumn[] = cloneDeep(this.rightColumns);
    this.rightColumns = this.originalRightColumns
      .filter((nextColumn) => nextColumn.visible)
      .sort((a, b) => {
        if (a.pinned && b.pinned) {
          return columnsCopy.findIndex((k) => k.name === a.name) - columnsCopy.findIndex((k) => k.name === b.name);
        }
        return a.pinned ? -1 : 1;
      });
  }
}
