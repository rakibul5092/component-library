import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MAT_SELECT_CONFIG } from '@angular/material/select';
import { TranslateModule } from '@ngx-translate/core';
import { EditorModule } from '@tinymce/tinymce-angular';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { ColumnManagementModalModule } from '../column-management-modal/column-management-modal.module';
import { FormFieldModule } from '../form-field/form-field.module';
import { GridFiltersModule } from '../grid-filters/grid-filters.module';
import { PipeModule } from '../pipes/pipe.module';
import { SearchBarModule } from '../search-bar/search-bar.module';
import { TooltipModule } from '../tooltip/tooltip.module';
import { TypeaheadFieldModule } from '../typeahead-field/typeahead-field.module';
import { EditorWrapperComponent } from './editor-wrapper/editor-wrapper.component';
import { GridComponent } from './grid.component';

@NgModule({
  declarations: [GridComponent, EditorWrapperComponent],
  exports: [GridComponent],
  imports: [
    ButtonModule,
    CommonModule,
    HttpClientModule,
    ColumnManagementModalModule,
    DragDropModule,
    EditorModule,
    FormFieldModule,
    FormsModule,
    GridFiltersModule,
    MatDialogModule,
    MenuModule,
    PaginatorModule,
    PipeModule,
    TableModule,
    ReactiveFormsModule,
    SearchBarModule,
    TooltipModule,
    TypeaheadFieldModule,
    TranslateModule,
  ],
  providers: [
    {
      provide: MAT_SELECT_CONFIG,
      useValue: { overlayPanelClass: 'grid-overlay' },
    },
    CurrencyPipe,
  ],
})
export class GridModule {}
