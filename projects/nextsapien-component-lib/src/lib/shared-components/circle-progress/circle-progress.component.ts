import { Component, Input } from '@angular/core';

@Component({
  selector: 'lib-circle-progress',
  templateUrl: './circle-progress.component.html',
  styleUrls: ['./circle-progress.component.scss'],
})
export class CircleProgressComponent {
  @Input() width = '62.6px';
  @Input() height = '63.18px';
  @Input() prefix = '$';
  @Input() suffix = '';
  @Input() value = 10;
  @Input() max = 100;
  @Input() imageUrl: string;
  @Input() type: string;
  private pathLength = 393.72802734375;

  /**
   *
   * @returns
   */
  public calcValue(): number {
    return this.pathLength - (this.value * this.pathLength) / this.max;
  }
}
