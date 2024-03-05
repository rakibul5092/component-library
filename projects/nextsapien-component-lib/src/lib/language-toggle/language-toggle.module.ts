import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LanguageTogglerComponent } from './language-toggler/language-toggler.component';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [LanguageTogglerComponent],
  imports: [CommonModule, MatMenuModule, MatButtonModule, MatIconModule],
  exports: [LanguageTogglerComponent],
})
export class LanguageToggleModule {}
