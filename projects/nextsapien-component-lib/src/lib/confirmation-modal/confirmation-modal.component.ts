import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ItemActionHandler } from '../model/item-action-handler';

@Component({
  selector: 'lib-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss'],
})
export class ConfirmationModalComponent {
  public title: string;
  public headerIconTray: ItemActionHandler[] = [];
  public dialogMessage: string;
  public confirmText: string;
  public warningModal: boolean;
  public hideCancelAction: boolean;

  public readonly searchModeThreshold = 50;

  constructor(public dialogRef: MatDialogRef<ConfirmationModalComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.title = data.title;
    this.headerIconTray = data.headerIconTray;
    this.dialogMessage = data.dialogMessage;
    this.confirmText = data.confirmText;
    this.warningModal = data.warningModal;
    this.hideCancelAction = data.hideCancelAction;
  }

  // ----- Methods called by template -----

  /**
   * Closes the dialog
   */
  public handleClickCancel(): void {
    this.dialogRef.close(false);
  }

  /**
   * Closes the dialog and returns true to the dialog owner.
   */
  public handleClickSave(): void {
    this.dialogRef.close(true);
  }

  public headerIconClicked(icon: ItemActionHandler) {
    if (icon && icon.action) {
      icon.action({});
    }
  }
}
