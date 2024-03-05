import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { Profile } from './profile.model';

@Component({
  selector: 'lib-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss'],
})
export class ProfileCardComponent implements OnChanges {
  @Input() profile: Profile;
  @Input() progressText: string = 'Progress';
  @ViewChild('progressBar') progressBar: any;

  ngOnChanges(changes: SimpleChanges): void {
    setTimeout(() => {
      const progressDiv = (this.progressBar?.el?.shadowRoot as ShadowRoot)?.querySelectorAll('.progress')[0] as HTMLDivElement;
      if (progressDiv) {
        progressDiv.style.transform = 'none';
        const percent = this.profile.progress * 100 + '%';
        progressDiv.style.width = percent;
        const progressBlur = document.getElementById('progressBlur' + this.profile.id) as HTMLDivElement;
        progressBlur.style.width = percent;
      }
    }, 500);
  }
}
