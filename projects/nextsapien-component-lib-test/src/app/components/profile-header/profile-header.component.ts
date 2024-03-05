import { Component } from '@angular/core';
import { ProfileHeaderOrientation } from 'nextsapien-component-lib';

@Component({
  selector: 'app-profile-header',
  templateUrl: './profile-header.component.html',
  styleUrls: ['./profile-header.component.scss'],
})
export class ProfileHeaderComponent {
  public client = {
    id: 1,
    name: 'James Sullivan',
    value: 21,
    photo: 'https://i.ibb.co/Cv0FvRb/unsplash-WNo-Ln-Jo7t-S8profile.png',
    notification: 10,
    age: 23,
    address: 'New York City, NY',
    myPhotos: [
      'https://i.ibb.co/Cv0FvRb/unsplash-WNo-Ln-Jo7t-S8profile.png',
      'https://i.ibb.co/Cv0FvRb/unsplash-WNo-Ln-Jo7t-S8profile.png',
      'https://i.ibb.co/Cv0FvRb/unsplash-WNo-Ln-Jo7t-S8profile.png',
    ],
  };

  public icons: any = {
    hash: 'assets/icon/hash.svg',
    location: 'assets/icon/location.svg',
  };

  public vertical = ProfileHeaderOrientation.vertical;
  public horizontal = ProfileHeaderOrientation.horizontal;
}
