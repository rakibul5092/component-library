import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { IonicModule } from '@ionic/angular';
import { AuthService } from './../auth.service';

import { of } from 'rxjs';

import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DefaultDataServiceConfig } from '@ngrx/data';
import { SharedService } from '../../shared/shared.service';
import { TranslationModule } from '../../translation.module';
import { ResendVerificationMailComponent } from './resend-verification-mail.component';

describe('Resend verification', () => {
  let component: ResendVerificationMailComponent;
  let fixture: ComponentFixture<ResendVerificationMailComponent>;
  let authService: AuthService;
  let mockedAuthService: any;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [AuthService, { provide: DefaultDataServiceConfig, useClass: DefaultDataServiceConfig }, { provide: SharedService, useClass: SharedService }, FormBuilder],
      declarations: [ResendVerificationMailComponent],
      imports: [
        IonicModule.forRoot(),
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatCardModule,
        MatSnackBarModule,
        NoopAnimationsModule,
        TranslationModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ResendVerificationMailComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    mockedAuthService = jest.spyOn(authService, 'resendVerifyEmail');
    fixture.detectChanges();
  }));

  afterEach(() => {
    mockedAuthService.mockClear();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be working onSubmit function', () => {
    mockedAuthService.mockReturnValue(
      of({
        success: true,
      }),
    );
    const emailController = new FormControl('', [Validators.required, Validators.email]);
    const formGroup = new FormGroup({ email: emailController });
    formGroup.setValue({ email: 'test@gmail.com' });
    formGroup.markAsTouched();
    component.onSubmit(formGroup);
    expect(mockedAuthService).toHaveBeenCalled();
  });

  it('should not be working before of formGroup being invalid and untouched', () => {
    mockedAuthService.mockReturnValue(
      of({
        success: false,
      }),
    );
    const submitButton: HTMLElement = fixture.nativeElement.querySelector('button');
    submitButton.click();
    expect(mockedAuthService).toHaveBeenCalledTimes(0);
  });
});
