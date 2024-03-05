import { Component, Input } from '@angular/core';

@Component({
  selector: 'lib-wave-progress',
  templateUrl: `./wave-progress.component.html`,
  styleUrls: [`./wave-progress.component.scss`],
})
export class WaveProgressComponent {
  @Input() waveColor: string;
  public waveLines = new Array(6);
}
