import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { AuthService } from './../auth.service';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DefaultDataServiceConfig } from '@ngrx/data';
import { TranslationModule } from '../../translation.module';
import { ResetPasswordComponent } from './reset-password.component';

describe('RegisterComponent Reset Password', () => {
  let component: ResetPasswordComponent;
  let fixture: ComponentFixture<ResetPasswordComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: AuthService,
          useValue: {
            resetPassword: () =>
              of({
                success: true,
              }),
          },
        },
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({ get: (key) => key }),
          },
        },
        DefaultDataServiceConfig,
        FormBuilder,
      ],
      declarations: [ResetPasswordComponent],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatCardModule,
        MatSnackBarModule,
        BrowserAnimationsModule,
        TranslationModule,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  it('should create', () => {
    fixture = TestBed.createComponent(ResetPasswordComponent);
    component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
