import { Component, Input } from '@angular/core';

@Component({
  selector: 'lib-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.scss'],
})
export class MessageBoxComponent {
  @Input() imageUrl: string = 'message box needs an [imageUrl]';
  @Input() title: string = 'Message box needs a [title]';
  @Input() text: string = 'Message box needs a [text]';
  @Input() imageDescription: string = 'An message icon';
}
