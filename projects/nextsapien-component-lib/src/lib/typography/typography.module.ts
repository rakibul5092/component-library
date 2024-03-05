import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { FooterComponent } from './footer/footer.component';
import { TitleComponent } from './title/title.component';

@NgModule({
  declarations: [TitleComponent, FooterComponent],
  imports: [CommonModule, IonicModule, TranslateModule],
  exports: [TitleComponent, FooterComponent],
})
export class TypographyModule {}
