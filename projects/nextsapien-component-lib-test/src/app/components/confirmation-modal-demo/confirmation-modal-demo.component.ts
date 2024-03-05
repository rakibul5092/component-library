import { Component } from '@angular/core';

@Component({
  selector: 'app-confirmation-modal-demo',
  templateUrl: './confirmation-modal-demo.component.html',
  styleUrls: ['./confirmation-modal-demo.component.scss'],
})
export class ConfirmationModalDemoComponent {
  public title = 'Are you sure you want to enable demo?';
  public dialogMessage = 'This is the demo dialog message.';
  public confirmText = 'Save';
  public warningModal = false;
  public hideCancelAction = false;

  public handleWarningModalChange(): void {
    this.warningModal = !this.warningModal;
  }

  public handleCancelActionChange(): void {
    this.hideCancelAction = !this.hideCancelAction;
  }
}
