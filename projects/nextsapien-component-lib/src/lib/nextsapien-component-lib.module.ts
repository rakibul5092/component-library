import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { IonicModule } from '@ionic/angular';
import { MessageBoxComponent } from '../lib/shared-components/message-box/message-box.component';
import { ConfirmationModalModule } from './confirmation-modal/confirmation-modal.module';
import { FormFieldModule } from './form-field/form-field.module';
import { GridFiltersModule } from './grid-filters/grid-filters.module';
import { GridModule } from './grid/grid.module';
import { EmptyFillUpComponent } from './shared-components/empty-fill-up/empty-fill-up.component';

@NgModule({
  declarations: [EmptyFillUpComponent, MessageBoxComponent],
  imports: [
    CommonModule,

    RouterModule,
    IonicModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatDividerModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    TranslateModule,

    GridModule,
    GridFiltersModule,
    FormFieldModule,
    ConfirmationModalModule,
  ],

  exports: [EmptyFillUpComponent, MessageBoxComponent],
})
export class NextsapienComponentLibModule {}
