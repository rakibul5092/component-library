import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ImageGalleryComponent } from './image-gallery.component';
import { ImageComponent } from './image/image.component';

import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [ImageComponent, ImageGalleryComponent],
  imports: [CommonModule, MatSlideToggleModule, MatIconModule, IonicModule, MatTooltipModule, TranslateModule],
  exports: [ImageGalleryComponent],
})
export class ImageGalleryModule {}
