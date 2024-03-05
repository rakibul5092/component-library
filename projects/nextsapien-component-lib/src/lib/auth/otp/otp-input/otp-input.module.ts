import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { IonicModule } from '@ionic/angular';

import { DirectiveModule } from '../../../directives/directive.module';
import { TranslationModule } from '../../../translation.module';
import { OtpInputComponent } from './otp-input.component';

@NgModule({
  imports: [CommonModule, DirectiveModule, FormsModule, ReactiveFormsModule, IonicModule, MatInputModule, MatButtonModule, MatIconModule, TranslationModule],
  declarations: [OtpInputComponent],
  providers: [],
  exports: [OtpInputComponent],
})
export class OtpInputModule {}
