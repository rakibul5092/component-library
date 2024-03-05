import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent {
  public form: UntypedFormGroup;

  constructor(private fb: UntypedFormBuilder, private authService: AuthService) {
    this.form = this.fb.group({
      email: [null, Validators.required],
    });
  }

  public onSubmit(form: UntypedFormGroup) {
    const { value, valid, touched } = form;
    if (touched && valid) {
      this.authService.forgotPassword(value).subscribe((response) => {});
    }
  }
}
