import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { IonicModule } from '@ionic/angular';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { DefaultDataServiceConfig } from '@ngrx/data';
import { of } from 'rxjs';
import { SharedService } from '../../shared/shared.service';
import { TranslationModule } from '../../translation.module';
import { AuthService } from '../auth.service';
import { LoginComponent } from './login.component';

describe('Login Component', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router: Router;
  let mockedAuthService: any;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [AuthService, { provide: DefaultDataServiceConfig, useClass: DefaultDataServiceConfig }, { provide: SharedService, useClass: SharedService }, FormBuilder],
      declarations: [LoginComponent],
      imports: [
        IonicModule.forRoot(),
        HttpClientTestingModule,
        ReactiveFormsModule,
        MatInputModule,
        MatIconModule,
        MatCardModule,
        MatSnackBarModule,
        NoopAnimationsModule,
        RouterTestingModule.withRoutes([
          {
            path: 'admin',
            component: LoginComponent,
          },
        ]),
        TranslationModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    router = TestBed.inject(Router);
    component = fixture.debugElement.componentInstance;
    mockedAuthService = jest.spyOn(TestBed.inject(AuthService), 'login');
    fixture.detectChanges();
  }));

  afterEach(() => {
    mockedAuthService.mockClear();
  });

  it('should be working onSubmit function', () => {
    const navigateSpy = jest.spyOn(router, 'navigate');
    mockedAuthService.mockReturnValue(
      of({
        success: true,
      }),
    );
    const emailController = new FormControl('', [Validators.required, Validators.email]);
    const passwordController = new FormControl('', [Validators.required]);
    const formGroup = new FormGroup({ email: emailController, password: passwordController });
    formGroup.setValue({ email: 'test@gmail.com', password: '123456' });
    formGroup.markAsTouched();
    component.form = formGroup;
    component.onSubmit();
    expect(mockedAuthService).toHaveBeenCalled();
    expect(navigateSpy).toHaveBeenCalledWith(['/admin']);
  });

  it('should be working onSubmit button', () => {
    mockedAuthService.mockReturnValue(
      of({
        success: true,
      }),
    );
    const emailInput: HTMLInputElement = fixture.nativeElement.querySelector('#email') as HTMLInputElement;
    const passwordInput: HTMLInputElement = fixture.nativeElement.querySelector('#password') as HTMLInputElement;
    emailInput.value = 'test@gmail.com';
    emailInput.dispatchEvent(new Event('input'));
    passwordInput.value = '123456';
    passwordInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    const submitButton: HTMLElement = fixture.nativeElement.querySelector('button');
    submitButton.click();
    // expect(mockedAuthService).toHaveBeenCalled();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
