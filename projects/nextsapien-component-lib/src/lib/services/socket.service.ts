import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { BehaviorSubject } from 'rxjs';

import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private user: any = {};
  private countsObservable$: BehaviorSubject<any> = new BehaviorSubject({});
  private notificationObservable = new BehaviorSubject<[]>([]);
  private moduleChangeObservable = new BehaviorSubject<any>({});
  private newUserVerified$ = new BehaviorSubject<any>({});
  constructor(private socket: Socket, private snackbar: MatSnackBar) {
    this.initSocket();
  }

  get notifications() {
    return this.notificationObservable.asObservable();
  }

  get counts() {
    return this.countsObservable$.asObservable();
  }

  get moduleChange() {
    return this.moduleChangeObservable.asObservable();
  }

  get newUserVerified() {
    return this.newUserVerified$.asObservable();
  }

  private initSocket() {
    if (localStorage['user']) {
      this.user = JSON.parse(localStorage['user'] || {});
    }
    if (this.user && this.user._id) {
      this.socket.emit('register', {
        _id: this.user._id,
      });
      this.socket.on('notification', (notification) => {
        this.notificationObservable.next(notification);
        if (notification.message === 'New Order Received') {
          this.moduleChangeObservable.next({ module: 'orders' });
        }

        this.snackbar.open(notification.message, '', {
          duration: 5000,
          panelClass: ['success-snackbar'],
        });
      });
      this.socket.on('counts', (counts) => {
        this.countsObservable$.next(counts || { notifications: 0 });
      });
      this.socket.on('moduleChange', (change) => {
        if (change && change.user_id !== this.user._id) {
          this.moduleChangeObservable.next(change);
        }
      });
      this.socket.on('userVerified', (user) => {
        this.newUserVerified$.next(user);
      });
    }
  }

  public getNotifications() {
    this.socket.emit('get_counts', {
      _id: this.user._id,
    });
  }

  public notifyUserEmailVerified(id: string) {
    this.socket.emit('verified_user', {
      id: id,
    });
  }
}
