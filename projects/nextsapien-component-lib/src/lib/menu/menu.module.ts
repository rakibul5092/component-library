import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { IonicModule } from '@ionic/angular';

import { MenuComponent } from './menu.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, RouterModule, IonicModule],
  declarations: [MenuComponent],
  exports: [MenuComponent],
})
export class AppMenuModule {}
