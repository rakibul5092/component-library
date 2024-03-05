import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { TooltipModule } from '../tooltip/tooltip.module';
import { ConfirmationModalComponent } from './confirmation-modal.component';

@NgModule({
  declarations: [ConfirmationModalComponent],
  exports: [ConfirmationModalComponent],
  imports: [CommonModule, TooltipModule, MatDialogModule],
})
export class ConfirmationModalModule {}
