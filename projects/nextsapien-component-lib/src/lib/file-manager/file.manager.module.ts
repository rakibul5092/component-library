import { CommonModule } from '@angular/common';

import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { FileUploadComponent } from './file-upload/file-upload.component';

@NgModule({
  imports: [CommonModule, IonicModule],
  declarations: [FileUploadComponent],
  exports: [FileUploadComponent],
})
export class FileManagerModule {}
