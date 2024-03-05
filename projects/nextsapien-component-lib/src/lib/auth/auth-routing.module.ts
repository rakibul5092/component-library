import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { AuthTwoFaComponent } from './mfa/auth-two-fa/auth-two-fa.component';
import { ResendVerificationMailComponent } from './resend-verification-mail/resend-verification-mail.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'verify_email/:id/:code',
    pathMatch: 'full',
    component: VerifyEmailComponent,
  },
  {
    path: 'reset_password/:code',
    pathMatch: 'full',
    component: ResetPasswordComponent,
  },
  {
    path: 'forgot_password',
    pathMatch: 'full',
    component: ForgotPasswordComponent,
  },
  {
    path: 'resend_verification_mail',
    pathMatch: 'full',
    component: ResendVerificationMailComponent,
  },
  {
    path: '2fa',
    pathMatch: 'full',
    component: AuthTwoFaComponent,
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthPageRoutingModule {}
