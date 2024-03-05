import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-resend-verification-mail',
  templateUrl: './resend-verification-mail.component.html',
  styleUrls: ['./resend-verification-mail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResendVerificationMailComponent {
  public form: UntypedFormGroup;
  public success: boolean = false;
  public isLoading: boolean = false;

  constructor(private fb: UntypedFormBuilder, private authService: AuthService, private changeDetection: ChangeDetectorRef) {
    this.form = this.fb.group({
      email: [
        null,
        Validators.required,
        // FIXME: Email validator
      ],
    });
  }

  public onSubmit(form: UntypedFormGroup) {
    const { value, valid, touched } = form;
    if (touched && valid) {
      this.isLoading = true;
      this.authService
        .resendVerifyEmail(value)
        .pipe(
          finalize(() => {
            this.isLoading = false;
            this.changeDetection.markForCheck();
          }),
        )
        .subscribe((response) => {
          if (response.success) {
            this.success = true;
            this.changeDetection.markForCheck();
          }
        });
    }
  }
}
