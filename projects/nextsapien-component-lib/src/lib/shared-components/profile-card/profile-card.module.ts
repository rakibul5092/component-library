import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ProfileCardComponent } from './profile-card.component';

@NgModule({
  declarations: [ProfileCardComponent],
  imports: [CommonModule, IonicModule],
  exports: [ProfileCardComponent],
})
export class ProfileCardModule {}
