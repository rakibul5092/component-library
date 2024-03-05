import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';

import { IonicModule } from '@ionic/angular';

import { MatInputModule } from '@angular/material/input';
import { TranslateModule } from '@ngx-translate/core';
import { DirectiveModule } from '../directives/directive.module';
import { GridModule } from '../grid/grid.module';
import { LibLoadersModule } from '../loaders/lib-loaders.module';
import { PrimeNgGridComponent } from './primeng-grid/primeng-grid.component';

@NgModule({
  declarations: [PrimeNgGridComponent],
  imports: [
    CommonModule,
    DirectiveModule,
    IonicModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatTooltipModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    LibLoadersModule,
    GridModule,
    TranslateModule,
  ],
  exports: [PrimeNgGridComponent],
})
export class LibPrimeNgGridModule {}
