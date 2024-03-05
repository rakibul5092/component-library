import { Inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { TranslationService } from '../translation.service';
import { SNACKBARTYPE } from './constants';
import { SharedService } from './shared.service';

@Injectable({ providedIn: 'root' })
export class AdminModuleEntityBase {
  public showDeletedItems: boolean = false;

  constructor(
    @Inject(String) private moduleName: any,
    @Inject('') private service: any,
    private _sharedService: SharedService,
    private dialog: MatDialog,
    private translateService: TranslationService,
  ) {}

  ionViewWillEnter = () => this.getData();

  /**
   * get grid data
   * @param { Object } conditions  conditions
   * @param { string }populate
   * @param { string } limit
   * @param { string }skip
   */
  getData(conditions: Object = {}, populate: string = '', limit: string = '10', skip: string = '0'): void {
    conditions = {
      isDeleted: this.showDeletedItems,
    };
    this.service.clearCache();
    this.service.getWithPopulatedFields(conditions, populate, limit, skip, '-created_at');
  }

  /**
   * on pagination page change
   * @param event pagination
   */
  public pageChange = (event) => this.getData({}, '', event.pageSize, event.skip);

  /**
   * toggle Deleted Items action
   */
  toggleDeletedItems(): void {
    this.showDeletedItems = !this.showDeletedItems;
    this.getData();
  }

  /**
   * delete action
   * @param request object to delete
   * @param successMsg snackbar msg for success
   */
  delete(request: any, successMsg: string): void {
    this.service.delete(request).subscribe(() => {
      this.translateService.get(successMsg).subscribe((translation) => {
        this._sharedService.openSnackBar(translation, '', SNACKBARTYPE.success);
      });
    });
  }

  /**
   * restore action
   * @param request object to restore
   * @param successMsg snackbar msg for success
   */
  restore(request: any, successMsg: string): void {
    request = { ...request, isDeleted: false };
    this.service.update(request).subscribe(() => {
      this.translateService.get(successMsg).subscribe((translation) => {
        this._sharedService.openSnackBar(translation, '', SNACKBARTYPE.success);
      });
    });
  }

  /**
   * update action
   * @param request object to update
   * @param successMsg snackbar msg for success
   */
  update(request, successMsg: string): void {
    this.service.update(request).subscribe(() => {
      this.translateService.get(successMsg).subscribe((translation) => {
        this._sharedService.openSnackBar(translation, '', SNACKBARTYPE.success);
      });
    });
  }

  /**
   * add action
   * @param request object to add
   * @param successMsg snackbar msg for success
   */
  add(request, successMsg: string): void {
    this.service.add(request).subscribe(() => {
      this.translateService.get(successMsg).subscribe((translation) => {
        this._sharedService.openSnackBar(translation, '', SNACKBARTYPE.success);
      });
    });
  }

  /**
   * save action
   * @param listRequest List of objects to save
   * @param successMsg snackbar msg for success
   */
  saveList(listRequest: any[], successMsg: string): void {
    if (!listRequest || listRequest.length === 0) {
      return;
    }
    for (let i = 0; i < listRequest.length; i++) {
      this.service.add(listRequest[i]).subscribe(() => {
        if (i === listRequest.length - 1) {
          this.translateService.get(successMsg).subscribe((translation) => {
            this._sharedService.openSnackBar(translation, '', SNACKBARTYPE.success);
          });
        }
      });
    }
  }

  /**
   *  after close dialog util service for details components popups
   * @param dialogComponent
   * @param data for the dialog
   * @param width of the dialog
   */
  afterCloseDialog(dialogComponent, data, width = '75%'): Observable<any> {
    return this.dialog
      .open(dialogComponent, {
        data: data,
        width: width,
      })
      .afterClosed();
  }

  /**
   * success callback util function
   * @param msg to notify the user
   */
  successCallBack(msg: string): void {
    this.getData();
    this._sharedService.openSnackBar(msg, '', SNACKBARTYPE.success);
  }

  /**
   * on Module Changes After any action Socket Event
   * @param socket
   * @param unsubscribeAll
   * @param moduleName is the changed module name
   */
  onModuleChanges(socket, unsubscribeAll: Subject<any>, moduleName) {
    socket.moduleChange.pipe(takeUntil(unsubscribeAll)).subscribe((change) => {
      if (change.module === moduleName) {
        this.getData();
      }
    });
  }

  /**
   * on add or edit action
   * @param data to add/update
   * @param successMsg snackbar msg for success
   * @param component is the popup/detail component
   */
  addEditItem(data: any = {}, component: any, successMsg: string) {
    this.afterCloseDialog(component, data).subscribe((response) => {
      if (response) {
        this.showDeletedItems = false;
        response._id ? this.update(response, successMsg) : this.add(response, successMsg);
      }
    });
  }
}
