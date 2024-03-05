import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { DefaultDataServiceConfig } from '@ngrx/data';
import { TranslationModule } from '../../../translation.module';
import { AuthService } from '../../auth.service';
import { OtpInputComponent } from '../../otp/otp-input/otp-input.component';
import { AuthTwoFaComponent } from './auth-two-fa.component';

describe('AuthTwoFaComponent', () => {
  let component: AuthTwoFaComponent;
  let fixture: ComponentFixture<AuthTwoFaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthTwoFaComponent, OtpInputComponent],
      imports: [IonicModule, FormsModule, ReactiveFormsModule, HttpClientTestingModule, MatSnackBarModule, TranslationModule, RouterTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [AuthService, DefaultDataServiceConfig],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthTwoFaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
