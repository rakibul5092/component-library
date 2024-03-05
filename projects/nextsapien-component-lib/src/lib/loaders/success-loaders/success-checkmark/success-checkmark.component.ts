import { Component, Input } from '@angular/core';

@Component({
  selector: 'lib-success-checkmark',
  templateUrl: `./success-checkmark.component.html`,
  styleUrls: [`./success-checkmark.component.scss`],
})
export class SuccessCheckmarkComponent {
  @Input() checkmarkSize = 20;
  @Input() successMessage = 'Success';
}
