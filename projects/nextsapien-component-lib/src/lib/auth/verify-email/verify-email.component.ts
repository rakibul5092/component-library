import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SocketService } from '../../services/socket.service';
import { SNACKBARTYPE } from '../../shared/constants';
import { SharedService } from '../../shared/shared.service';
import { TranslationService } from '../../translation.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss'],
})
export class VerifyEmailComponent {
  public verificationStatus: string = 'LIB.AUTH.EMAIL_VERIFICATION_ONGOING';
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private sharedService: SharedService,
    private translateService: TranslationService,
    private socketService: SocketService,
  ) {
    this.route.paramMap.subscribe((params) => {
      const userID = params.get('id');
      const code = params.get('code');
      this.authService.verifyEmail(userID, code).subscribe(
        (response) => {
          if (response.success) {
            this.verificationStatus = 'LIB.AUTH.EMAIL_VERIFICATION_SUCCESSFUL';
            this.translateService.get(`SNACKBAR.${response.info}`).subscribe((translation) => {
              const snackbarRef = this.sharedService.openSnackBar(translation, '', SNACKBARTYPE.success);
              snackbarRef.afterDismissed().subscribe((info) => this.router.navigate(['/auth', 'reset_password', code]));
            });
            this.socketService.notifyUserEmailVerified(userID);
          } else {
            this.verificationStatus = 'LIB.AUTH.EMAIL_VERIFICATION_FAILED';
            this.translateService.get(`SNACKBAR.${response.info}`).subscribe((translation) => {
              this.sharedService.openSnackBar(translation, '', SNACKBARTYPE.error);
            });
          }
        },

        (errorResponse) => {
          this.verificationStatus = 'LIB.AUTH.EMAIL_VERIFICATION_FAILED';
          this.translateService.get('SNACKBAR.' + errorResponse.error.info).subscribe((translation) => {
            this.sharedService.openSnackBar(translation, '', SNACKBARTYPE.error);
          });
        },
      );
    });
  }
}
