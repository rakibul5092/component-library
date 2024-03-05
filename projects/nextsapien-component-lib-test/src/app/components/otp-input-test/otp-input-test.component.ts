import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-otp-input-test',
  templateUrl: './otp-input-test.component.html',
  styleUrls: ['./otp-input-test.component.scss'],
})
export class OtpInputTestComponent {
  public code1: FormControl = new FormControl<any>('', [Validators.required, Validators.minLength(5)]);
  public code2: FormControl = new FormControl<any>('', [Validators.required, Validators.minLength(6)]);

  public clearControl(): void {
    this.code1.reset();
    this.code2.reset();
  }
}
