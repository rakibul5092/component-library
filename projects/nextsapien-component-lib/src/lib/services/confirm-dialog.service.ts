import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class ConfirmDialogService {
  constructor(public matDialog: MatDialog) {}

  private dialogRef: MatDialogRef<ConfirmDialogComponent>;

  public open(options: any): void {
    this.dialogRef = this.matDialog.open(ConfirmDialogComponent, {
      data: {
        title: options.title,
        message: options.message,
        cancelText: options.cancelText,
        confirmText: options.confirmText,
      },
    });
  }

  public confirmed(): Observable<any> {
    return this.dialogRef.afterClosed().pipe(
      take(1),
      map((result) => {
        return result;
      }),
    );
  }
}
