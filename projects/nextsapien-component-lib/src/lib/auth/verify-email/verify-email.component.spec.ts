import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DefaultDataServiceConfig } from '@ngrx/data';
import { of } from 'rxjs';
import { SocketService } from '../../services/socket.service';
import { SharedService } from '../../shared/shared.service';
import { TranslationModule } from '../../translation.module';
import { AuthService } from '../auth.service';
import { VerifyEmailComponent } from './verify-email.component';

describe('RegisterComponent Verify Email', () => {
  let component: VerifyEmailComponent;
  let fixture: ComponentFixture<VerifyEmailComponent>;
  let authService: AuthService;
  let mockedAuthService: any;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({ get: (key) => key }),
          },
        },
        {
          provide: Router,
          useValue: {
            paramMap: of({ get: (key) => key }),
          },
        },
        { provide: DefaultDataServiceConfig, useClass: DefaultDataServiceConfig },
        { provide: SharedService, useClass: SharedService },
        {
          provide: SocketService,
          useValue: {
            notifyUserEmailVerified: (userId) => userId,
          },
        },
      ],
      declarations: [VerifyEmailComponent],
      imports: [RouterTestingModule, HttpClientTestingModule, MatCardModule, MatSnackBarModule, BrowserAnimationsModule, TranslationModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
    authService = TestBed.inject(AuthService);
    mockedAuthService = jest.spyOn(authService, 'verifyEmail');
  }));

  afterEach(() => {
    mockedAuthService.mockClear();
  });

  it('should create', () => {
    mockedAuthService.mockReturnValue(
      of({
        success: true,
      }),
    );
    fixture = TestBed.createComponent(VerifyEmailComponent);
    component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should verify email', () => {
    mockedAuthService.mockReturnValue(
      of({
        success: true,
      }),
    );
    fixture = TestBed.createComponent(VerifyEmailComponent);
    component = fixture.componentInstance;
    expect(component.verificationStatus).toEqual('LIB.AUTH.EMAIL_VERIFICATION_SUCCESSFUL');
    expect(mockedAuthService).toHaveBeenCalled();
  });

  it('should not verify email', () => {
    mockedAuthService.mockReturnValue(
      of({
        success: false,
      }),
    );
    fixture = TestBed.createComponent(VerifyEmailComponent);
    component = fixture.componentInstance;
    expect(mockedAuthService).toHaveBeenCalled();
    fixture.detectChanges();
  });
});
