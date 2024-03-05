import { Component } from '@angular/core';

@Component({
  selector: 'app-circle-progress',
  templateUrl: './circle-progress.component.html',
  styleUrls: ['./circle-progress.component.scss'],
})
export class CircleProgressComponent {
  public width = '50px';

  public onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.width = input.value + 'px';
  }
}
