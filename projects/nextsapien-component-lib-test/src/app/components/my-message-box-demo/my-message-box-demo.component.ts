import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-my-message-box-demo',
  templateUrl: './my-message-box-demo.component.html',
  styleUrls: ['./my-message-box-demo.component.scss'],
})
export class MyMessageBoxDemoComponent {
  @Input() imageUrl = '';
  @Input() title = '';
  @Input() text = '';
  @Input() imageDescription = '';

  public updateTitle(event: Event): void {
    this.title = (event.target as HTMLInputElement).value;
  }

  public updateText(event: Event): void {
    this.text = (event.target as HTMLInputElement).value;
  }

  public updateImageUrl(event: Event): void {
    this.imageUrl = (event.target as HTMLInputElement).value;
  }

  public updateDescription(event: Event): void {
    this.imageDescription = (event.target as HTMLInputElement).value;
  }
}
