import { Component, Input } from '@angular/core';

@Component({
  selector: 'lib-empty-fill-up',
  templateUrl: './empty-fill-up.component.html',
  styleUrls: ['./empty-fill-up.component.scss'],
})
export class EmptyFillUpComponent {
  @Input() headerText: string;
  @Input() imageUrl: string = '/assets/pink-coffee-cup.png';
  @Input() text: string = `Let's fill this up! / Let's get a date!`;
}
