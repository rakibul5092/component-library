import { Component, Input } from '@angular/core';

@Component({
  selector: 'lib-multi-colored-text',
  templateUrl: './multi-colored-text.component.html',
  styleUrls: ['./multi-colored-text.component.scss'],
})
export class MultiColoredTextComponent {
  @Input() text: string;
  @Input() class: string;
}
