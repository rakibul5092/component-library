import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColumnManagementModalComponent } from './column-management-modal.component';
import { SearchBarModule } from '../search-bar/search-bar.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TooltipModule } from '../tooltip/tooltip.module';

@NgModule({
  declarations: [ColumnManagementModalComponent],
  imports: [CommonModule, SearchBarModule, DragDropModule, TooltipModule, MatCheckboxModule],
})
export class ColumnManagementModalModule {}
