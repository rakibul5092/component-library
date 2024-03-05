import { Component, OnDestroy } from '@angular/core';
import { FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';
import { SNACKBARTYPE } from '../../../shared/constants';
import { SharedService } from '../../../shared/shared.service';
import { TranslationService } from '../../../translation.service';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-auth-two-fa',
  templateUrl: './auth-two-fa.component.html',
  styleUrls: ['./auth-two-fa.component.scss'],
})
export class AuthTwoFaComponent implements OnDestroy {
  public email = 'batcoin@admin.com';
  public otp: string;
  public form: UntypedFormGroup;
  private token = '';
  public sending: boolean;

  private otpSendInterval = 600000;

  private otpExpirationCountdown: Subscription;
  public tokenExpirationTime = 600000; // 10mins
  public timeout = { mins: 0, secs: 0 };

  constructor(public fb: UntypedFormBuilder, private auth: AuthService, private route: Router, private sharedService: SharedService, private translateService: TranslationService) {
    this.form = this.fb.group({
      otp: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]],
    });

    this.token = localStorage.getItem('id_token');
    this.subscribeTocountdown();

    const userDetails = JSON.parse(localStorage.getItem('user'));
    if (userDetails) {
      this.email = userDetails.email;
    }
  }

  ngOnDestroy(): void {
    this.otpExpirationCountdown.unsubscribe();
  }

  public request2fa(form: FormGroup): void {
    if (form.invalid || !this.token) return;
    this.auth.request2fa(this.token, form.get('otp').value).subscribe(
      (response) => {
        this.translateService.get('SNACKBAR.LOGIN_SUCCESS').subscribe((translation) => {
          this.sharedService.openSnackBar(translation, '', SNACKBARTYPE.success);
        });
        this.route.navigate(['/admin']);
        localStorage.setItem('mfa', 'true');
      },
      (errorResponse) => {
        if (errorResponse.status === 400)
          this.translateService.get('LIB.AUTH.' + errorResponse.error.message).subscribe((translation) => {
            this.sharedService.openSnackBar(translation, '', SNACKBARTYPE.error);
          });
        else
          this.translateService.get('LIB.AUTH.' + errorResponse.error.message).subscribe((translation) => {
            this.sharedService.openSnackBar(translation, '', SNACKBARTYPE.error);
          });
      },
    );
  }

  public resendOTP() {
    if (this.sending) return;
    this.sending = true;
    this.auth.resendOTP(this.token).subscribe(
      (response) => {
        this.sharedService.openSnackBar('Code has been resent', '', SNACKBARTYPE.success);
        this.reSubscribeToCountdown();
        setTimeout(() => (this.sending = false), this.otpSendInterval);
      },

      (error) => this.sharedService.openSnackBar('Error trying to send code', '', SNACKBARTYPE.error),
    );
  }

  private subscribeTocountdown() {
    this.otpExpirationCountdown = this.sharedService.createCountDown(new Date(Date.now() + this.tokenExpirationTime)).subscribe((values: any) => {
      this.timeout.mins = values.mins;
      this.timeout.secs = values.secs;
    });
  }
  private reSubscribeToCountdown() {
    this.otpExpirationCountdown.unsubscribe();
    this.subscribeTocountdown();
  }
}
