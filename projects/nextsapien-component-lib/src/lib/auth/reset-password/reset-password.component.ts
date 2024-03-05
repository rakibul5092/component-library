import { Component } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent {
  public tab1: UntypedFormGroup;
  public submitted: boolean;
  public isLoading: boolean = false;
  private code: string;
  public hide = true;
  public hideConfirmPassword = true;

  constructor(private route: ActivatedRoute, private router: Router, private fb: UntypedFormBuilder, private authService: AuthService) {
    this.tab1 = this.fb.group(
      {
        password: [
          null,
          [
            Validators.required,
            Validators.minLength(6),
            this.cannotContainSpace,
            this.passwordValidator(new RegExp(/[a-z]/), {
              lowercase: '',
            }),
            this.passwordValidator(new RegExp(/[A-Z]/), {
              uppercase: '',
            }),
            this.passwordValidator(new RegExp(/[0-9]/), {
              number: '',
            }),
            this.passwordValidator(new RegExp(/[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/), {
              specialCharacter: '',
            }),
          ],
        ],
        reenter_password: [null, [Validators.required]],
      },
      { validators: this.checkPasswords },
    );

    this.route.paramMap.subscribe((params) => {
      this.code = params.get('code');
    });
  }

  public resetPassword(form: UntypedFormGroup) {
    this.submitted = true;
    const { value, valid, touched } = form;
    if (touched && valid && !this.isLoading) {
      this.isLoading = true;
      const val = {
        code: this.code,
        password: value.password,
      };
      this.authService
        .resetPassword(val)
        .pipe(finalize(() => (this.isLoading = false)))
        .subscribe((response) => {
          if (response.success) {
            this.router.navigate(['/auth', 'login']);
          }
        });
    }
  }

  private passwordValidator(nameRe: RegExp, error: ValidationErrors): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const forbidden = nameRe.test(control.value);
      return forbidden ? null : error;
    };
  }

  private checkPasswords(group: UntypedFormGroup): {} {
    // here we have the 'passwords' group
    if (group.value) {
      const pass = group.get('password').value;
      const confirmPass = group.get('reenter_password').value;
      if (pass) {
        return pass === confirmPass ? null : { notSame: true };
      } else {
        return { notValid: true };
      }
    } else {
      return null;
    }
  }
  get passwordControl() {
    return this.tab1.controls['password'];
  }

  private cannotContainSpace(control: AbstractControl): { [key: string]: any } | null | null {
    if (control.value && (control.value as string).indexOf(' ') >= 0) {
      return { cannotContainSpace: true };
    }
    return null;
  }
}
