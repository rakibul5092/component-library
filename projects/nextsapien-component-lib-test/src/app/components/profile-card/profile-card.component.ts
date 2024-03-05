import { Component } from '@angular/core';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss'],
})
export class ProfileCardComponent {
  public dataType = `
                profile: {<br/>
                  id: Number,<br/>
                  name: string,<br/>
                  value: Number,<br/>
                  photo: string,<br/>
                  notification: Number,<br/>
                  progress: Number<br/>
                }`;
  public profile1 = {
    id: 1,
    name: 'James Sullivan',
    value: 21,
    photo: 'https://i.ibb.co/Cv0FvRb/unsplash-WNo-Ln-Jo7t-S8profile.png',
    notification: 0,
    progress: 0,
  };
  public profile2 = {
    id: 2,
    name: 'James Sullivan',
    value: 21,
    photo: 'https://i.ibb.co/Cv0FvRb/unsplash-WNo-Ln-Jo7t-S8profile.png',
    notification: 10,
    progress: 0,
  };
  public profileWithProgress = {
    id: 1,
    name: 'James Sullivan',
    value: 21,
    photo: 'https://i.ibb.co/Cv0FvRb/unsplash-WNo-Ln-Jo7t-S8profile.png',
    notification: 10,
    progress: 0.6,
  };
}
