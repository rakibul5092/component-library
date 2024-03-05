import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ProfileHeaderComponent } from './profile-header.component';

@NgModule({
  declarations: [ProfileHeaderComponent],
  imports: [CommonModule, IonicModule],
  exports: [ProfileHeaderComponent],
})
export class ProfileHeaderModule {}
