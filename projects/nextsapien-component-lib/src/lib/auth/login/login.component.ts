import { Component, NgZone } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserMessages } from '../../enums/user-messages.enum';
import { SNACKBARTYPE } from '../../shared/constants';
import { SharedService } from '../../shared/shared.service';
import { TranslationService } from '../../translation.service';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public form: UntypedFormGroup;
  public loginInvalid = false;
  public isPassword: boolean = true;
  public isUserDeleted: boolean = false;

  constructor(
    private fb: UntypedFormBuilder,
    private router: Router,
    private authService: AuthService,
    private sharedService: SharedService,
    private translate: TranslationService,
    private zone: NgZone,
  ) {
    this.form = this.fb.group({
      email: ['', Validators.email],
      password: ['', Validators.required],
    });
  }

  public onSubmit() {
    const { value, valid, touched } = this.form;

    this.loginInvalid = false;
    this.isUserDeleted = false;
    if (valid && touched) {
      this.authService.login(value).subscribe((response) => {
        if (response.success) {
          this.zone.run(() => {
            if (response.requireOTP) this.router.navigate(['/auth/2fa'], { state: { auth: true } });
            else this.router.navigate(['/admin']);
          });
        } else if (!response.success && response.error == UserMessages.USERSOFTDELETED) {
          this.isUserDeleted = true;
        } else {
          this.loginInvalid = true;
        }
      });
    }
  }

  public mustBeInvited() {
    this.translate.get('LIB.AUTH.YOU_MUST_BE_INVITED').subscribe((res) => {
      this.sharedService.openSnackBar(res, '', SNACKBARTYPE.error);
    });
  }

  public togglePassword(event: any) {
    this.isPassword = !this.isPassword;

    event.stopPropagation();
  }
}
