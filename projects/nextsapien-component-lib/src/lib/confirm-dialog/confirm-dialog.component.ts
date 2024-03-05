import { Component, HostListener, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface IMatDialogData {
  cancelText: string;
  confirmText: string;
  message: string;
  title: string;
}

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
})
export class ConfirmDialogComponent {
  constructor(private mdDialogRef: MatDialogRef<ConfirmDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {}

  @HostListener('keydown.esc')
  public onEsc() {
    this.close(false);
  }

  public confirm() {
    this.close(true);
  }

  public cancel() {
    this.close(false);
  }

  private close(value) {
    this.mdDialogRef.close(value);
  }
}
