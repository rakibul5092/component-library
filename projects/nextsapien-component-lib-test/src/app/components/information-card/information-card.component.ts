import { Component } from '@angular/core';

@Component({
  selector: 'app-information-card',
  templateUrl: './information-card.component.html',
  styleUrls: ['./information-card.component.scss'],
})
export class InformationCardComponent {
  public myPhotos = [
    'https://i.ibb.co/Cv0FvRb/unsplash-WNo-Ln-Jo7t-S8profile.png',
    'https://i.ibb.co/Cv0FvRb/unsplash-WNo-Ln-Jo7t-S8profile.png',
    'https://i.ibb.co/Cv0FvRb/unsplash-WNo-Ln-Jo7t-S8profile.png',
  ];
}
