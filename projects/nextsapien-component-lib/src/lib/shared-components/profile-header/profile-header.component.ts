import { Component, Input } from '@angular/core';
import { ProfileHeaderOrientation } from './orientation.enum';

@Component({
  selector: 'lib-profile-header',
  templateUrl: './profile-header.component.html',
  styleUrls: ['./profile-header.component.scss'],
})
export class ProfileHeaderComponent {
  @Input() photo: string;
  @Input() name: string;
  @Input() leftIcon: any;
  @Input() rightIcon: any;
  @Input() leftText: string;
  @Input() rightText: string;
  @Input() orientation: string = ProfileHeaderOrientation.horizontal;
}
