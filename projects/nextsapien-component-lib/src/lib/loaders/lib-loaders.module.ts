import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { WaveProgressComponent } from './progress-loaders/wave/wave-progress.component';
import { SuccessCheckmarkComponent } from './success-loaders/success-checkmark/success-checkmark.component';

@NgModule({
  declarations: [WaveProgressComponent, SuccessCheckmarkComponent],
  imports: [CommonModule],
  exports: [WaveProgressComponent, SuccessCheckmarkComponent],
})
export class LibLoadersModule {}
