import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DefaultDataServiceConfig } from '@ngrx/data';
import { SharedService } from '../shared/shared.service';
import { TranslationModule } from '../translation.module';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [AuthService, { provide: DefaultDataServiceConfig, useClass: DefaultDataServiceConfig }, { provide: SharedService, useClass: SharedService }],
      imports: [HttpClientTestingModule, MatSnackBarModule, BrowserAnimationsModule, TranslationModule],
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Logout should clear localStorage', () => {
    localStorage.setItem('user', '{"id":1,"username":"test","password":"test","email":""}');
    service.logout();
    expect(localStorage.getItem('user')).toBeNull();
    expect(sessionStorage.getItem('id_token')).toBeNull();
  });

  it('Login should set localStorage and sessionStorage', () => {
    const mockPayload = {
      email: 'test@gmail.com',
      password: 'test',
    };

    service.login(mockPayload).subscribe((res) => {
      expect(res).toBeTruthy();
      expect(localStorage.getItem('user')).toBeTruthy();
    });

    const req: TestRequest = httpMock.expectOne(`${service.entityUrl}login`);

    expect(req.request.method).toBe('POST');

    req.flush({
      user: mockPayload,
      success: true,
    });
  });

  it('Unsuccessful login should return false', () => {
    localStorage.clear();
    const mockPayload = {
      email: 'usmanshahzad@gmail.com',
      password: '123456',
    };

    service.login(mockPayload).subscribe((res) => {
      expect(localStorage.getItem('user')).toBeFalsy();
    });

    const req: TestRequest = httpMock.expectOne(`${service.entityUrl}login`);

    expect(req.request.method).toBe('POST');

    req.flush({ success: false });
  });

  it('is Admin', () => {
    localStorage.setItem('user', '{"id":1,"username":"test","password":"test","email":"","role":{"id":1,"name":"Admin"}}');
    expect(service.isAdmin()).toBeTruthy();
  });

  it('is not Admin', () => {
    localStorage.setItem('user', '{"id":1,"username":"test","password":"test","email":"","role":{"id":1,"name":"user"}}');
    expect(service.isAdmin()).toBeFalsy();
  });
});
