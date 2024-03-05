import { Component } from '@angular/core';

@Component({
  selector: 'app-empty-fill-up-demo',
  templateUrl: './empty-fill-up-demo.component.html',
  styleUrls: ['./empty-fill-up-demo.component.scss'],
})
export class EmptyFillUpDemoComponent {
  public headerText = '';
  public text = '';
  public imageUrl = '';

  constructor() {}

  public updateHeaderText(event: Event): void {
    this.headerText = (event.target as HTMLInputElement).value;
  }

  public updateText(event: Event): void {
    this.text = (event.target as HTMLInputElement).value;
  }

  public updateImageUrl(event: Event): void {
    this.imageUrl = (event.target as HTMLInputElement).value;
  }
}
