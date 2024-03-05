import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DefaultDataServiceConfig } from '@ngrx/data';
import { of } from 'rxjs';
import { SharedService } from '../../shared/shared.service';
import { TranslateServiceStub, TranslateTestingModule } from '../../translation-testing.module';
import { TranslationModule } from '../../translation.module';
import { TranslationService } from '../../translation.service';
import { AuthService } from '../auth.service';
import { ForgotPasswordComponent } from './forgot-password.component';

describe('Register Forgot Password Component', () => {
  let component: ForgotPasswordComponent;
  let fixture: ComponentFixture<ForgotPasswordComponent>;
  let authService: AuthService;
  let mockedAuthService: any;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: DefaultDataServiceConfig, useClass: DefaultDataServiceConfig },
        { provide: SharedService, useClass: SharedService },
        { provide: TranslationService, useClass: TranslateServiceStub },
        FormBuilder,
      ],
      declarations: [ForgotPasswordComponent],
      imports: [HttpClientTestingModule, ReactiveFormsModule, TranslationModule, TranslateTestingModule, MatInputModule, MatCardModule, MatSnackBarModule, NoopAnimationsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(ForgotPasswordComponent);
    authService = TestBed.inject(AuthService);
    mockedAuthService = jest.spyOn(authService, 'forgotPassword');
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

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
});
