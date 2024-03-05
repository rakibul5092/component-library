import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';

import { AuthPageRoutingModule } from './auth-routing.module';

import { AuthPage } from './auth.page';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { ResendVerificationMailComponent } from './resend-verification-mail/resend-verification-mail.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';

import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { DirectiveModule } from '../directives/directive.module';
import { TranslationModule } from '../translation.module';
import { AuthService } from './auth.service';
import { AuthTwoFaComponent } from './mfa/auth-two-fa/auth-two-fa.component';
import { OtpInputModule } from './otp/otp-input/otp-input.module';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    DirectiveModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    AuthPageRoutingModule,
    TranslationModule,
    OtpInputModule,
  ],
  declarations: [AuthPage, LoginComponent, ResetPasswordComponent, ResendVerificationMailComponent, ForgotPasswordComponent, VerifyEmailComponent, AuthTwoFaComponent],
  exports: [],
  providers: [AuthService],
})
export class AuthPageModule {}
