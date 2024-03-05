import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';

import { Observable } from 'rxjs';
import { SharedService } from '../shared/shared.service';

import { DefaultDataServiceConfig } from '@ngrx/data';
import { UserMessages } from '../enums/user-messages.enum';
import { SNACKBARTYPE } from '../shared/constants';
import { TranslationService } from '../translation.service';

export enum LOCAL_STORAGE_KEYS {
  USER = 'user',
  LANGUAGE = 'language',
  // eslint-disable-next-line @typescript-eslint/naming-convention -- because we need a seperate ticket to change this localStorageKey
  ID_TOKEN = 'id_token',
  CART = 'cart',
  // eslint-disable-next-line @typescript-eslint/naming-convention -- because we need a seperate ticket to change this localStorageKey
  REQUIRE_OTP = 'require_otp',
  MFA = 'mfa',
}
@Injectable()
export class AuthService {
  entityUrl: string;

  constructor(private http: HttpClient, private config: DefaultDataServiceConfig, private sharedService: SharedService, private translateService: TranslationService) {
    this.entityUrl = this.config.root + '/users/';
  }

  public login(credentials): Observable<any> {
    return this.http.post(this.entityUrl + 'login', credentials).pipe(
      map((res: any) => {
        this.clearPrevStorage();
        if (res.success) {
          const user = JSON.stringify(res.user);
          localStorage.setItem(LOCAL_STORAGE_KEYS.USER, user);
          this.setSession(res);
          if (!res.requireOTP) {
            this.translateService.get('SNACKBAR.LOGIN_SUCCESS').subscribe((translation) => {
              this.sharedService.openSnackBar(translation, '', SNACKBARTYPE.success);
            });
          } else {
            localStorage.setItem(LOCAL_STORAGE_KEYS.REQUIRE_OTP, 'true');
          }
        } else if (!res.success && res.error == UserMessages.USERSOFTDELETED) {
          this.translateService.get('SNACKBAR.USER_SOFT_DELELTED').subscribe((translation) => {
            this.sharedService.openSnackBar(translation, '', SNACKBARTYPE.error);
          });
        } else {
          this.sharedService.openSnackBar(res.error, '', SNACKBARTYPE.error);
        }
        return res;
      }),
    );
  }

  public logout(prompt: boolean = true): void {
    this.clearPrevStorage();
    sessionStorage.clear();
    if (prompt) {
      this.translateService.get('SNACKBAR.LOGOUT_SUCCESS').subscribe((translation) => {
        this.sharedService.openSnackBar(translation, '', SNACKBARTYPE.success);
      });
    }
  }

  public register(credentials): Observable<any> {
    return this.http.post(this.entityUrl + 'register', credentials).pipe(
      map((res: any) => {
        if (res.success) {
          this.translateService.get('SNACKBAR.SIGNUP_SUCCESS').subscribe((translation) => {
            this.sharedService.openSnackBar(translation, '', SNACKBARTYPE.success);
          });
        } else {
          this.sharedService.openSnackBar(res.error, '', SNACKBARTYPE.error);
        }
        return res;
      }),
    );
  }

  public forgotPassword(credentials): Observable<any> {
    return this.http.post(this.entityUrl + 'forgot_password', credentials).pipe(
      map(
        (res: any) => {
          if (res.success) {
            this.sharedService.openSnackBar(res.info, '', SNACKBARTYPE.success);
          } else {
            this.sharedService.openSnackBar(res.error || res.info, '', SNACKBARTYPE.error);
          }
          return res;
        },
        (res: any) => {
          this.sharedService.openSnackBar(res.info, '', SNACKBARTYPE.error);
          return res;
        },
      ),
    );
  }

  public resetPassword(value): Observable<any> {
    return this.http.post(this.entityUrl + 'reset_password', value).pipe(
      map(
        (res: any) => {
          if (res.success) {
            this.sharedService.openSnackBar(res.info, '', SNACKBARTYPE.success);
          } else {
            this.sharedService.openSnackBar(res.error || res.info, '', SNACKBARTYPE.error);
          }
          return res;
        },
        (res: any) => {
          this.sharedService.openSnackBar(res.info, '', SNACKBARTYPE.error);
          return res;
        },
      ),
    );
  }

  public verifyEmail(userId, uniqueCode): Observable<any> {
    return this.http.get(this.entityUrl + userId + '/verify_email/' + uniqueCode);
  }

  public resendVerifyEmail(credentials): Observable<any> {
    return this.http.post(this.entityUrl + 'resendVerifyEmail', credentials).pipe(
      map(
        (res: any) => {
          if (res.success) {
            this.sharedService.openSnackBar(res.info, '', SNACKBARTYPE.success);
          } else {
            this.sharedService.openSnackBar(res.error || res.info, '', SNACKBARTYPE.error);
          }
          return res;
        },
        (res: any) => {
          this.sharedService.openSnackBar(res.info, '', SNACKBARTYPE.error);

          return res;
        },
      ),
    );
  }

  public isAdmin(): boolean {
    const user = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.USER));
    return user && user.role && user.role.name.toLowerCase().includes('admin');
  }

  private setSession(authResult): void {
    localStorage.setItem(LOCAL_STORAGE_KEYS.ID_TOKEN, authResult.idToken);
  }

  private clearPrevStorage() {
    localStorage.removeItem(LOCAL_STORAGE_KEYS.CART);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.USER);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.ID_TOKEN);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.REQUIRE_OTP);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.MFA);
  }

  public JWTHasExpired(token: string): Observable<any> {
    return this.http.get<any>(`${this.config.root}/users/validate_jwt`, {
      headers: new HttpHeaders({ Authorization: token }),
    });
  }

  public request2fa(code, token) {
    return this.http.get<any>(`${this.config.root}/users/mfa-auth`, {
      headers: new HttpHeaders({ 'auth-token': code, 'auth-otp': token }),
    });
  }

  public resendOTP(token) {
    return this.http.get<any>(`${this.config.root}/users/resend_otp`, {
      headers: new HttpHeaders({ 'auth-token': token }),
    });
  }
}
