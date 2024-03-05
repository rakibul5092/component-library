import { Injectable } from '@angular/core';

import { tap } from 'rxjs/operators';

import { DefaultDataServiceConfig } from '@ngrx/data';
import { SNACKBARTYPE } from '../shared/constants';
import { HttpUtilService } from '../shared/http-utils.service';
import { SharedService } from '../shared/shared.service';
import { TranslationService } from '../translation.service';

@Injectable({
  providedIn: 'root',
})
export class FileManagerService {
  constructor(private http: HttpUtilService, protected config: DefaultDataServiceConfig, private sharedService: SharedService, private translateService: TranslationService) {}

  /**
   * delete file fom aws s3
   * @param filename
   * @param disableAlert
   */
  public deleteFileFromAWS(filename, disableAlert: boolean = false) {
    return this.http
      .postRequest(this.config.root + '/s3/delete', {
        filename: filename,
      })
      .pipe(
        tap((response) => {
          if (!disableAlert) {
            this.translateService.get('SNACKBAR.FILE_DELETED').subscribe((translation) => {
              this.sharedService.openSnackBar(translation, '', SNACKBARTYPE.error);
            });
          }
        }),
      );
  }

  /**
   * delete list of files fom aws s3
   * @param files
   * @param disableAlert
   */
  public deleteFileBulkFromAWS(files: FileBody[], disableAlert: boolean = false) {
    return this.http.postRequest(this.config.root + '/s3/delete/bulk', { files: files }).pipe(
      tap((response) => {
        if (!disableAlert) {
          this.translateService.get('SNACKBAR.FILES_DELETED').subscribe((translation) => {
            this.sharedService.openSnackBar(translation, '', SNACKBARTYPE.error);
          });
        }
      }),
    );
  }
}

export class FileBody {
  filename: string;
}
