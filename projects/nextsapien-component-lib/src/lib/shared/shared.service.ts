import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Observer } from 'rxjs';
import { SNACKBARTYPE } from './constants';

class CountDown {
  private start: number;
  private end: number;
  public observer;
  constructor(observer: Observer<any>, date: Date) {
    this.observer = observer;
    this.end = date.getTime();
    this.tickNext();
  }

  private tickNext() {
    this.start = Date.now();
    if (this.start >= this.end) {
      this.observer.next({ days: 0, hours: 0, mins: 0, secs: 0 });
      this.observer.complete();
      return;
    }

    let timestamp = this.end - this.start;
    const oneDay = 86400000; // 24 * 3600 * 1000
    const oneHour = 3600000; // 60 * 60 * 1000
    const oneMin = 60000;
    const oneSec = 1000;

    const days = Math.floor(timestamp / oneDay);

    timestamp %= oneDay;
    const hours = Math.floor(timestamp / oneHour);

    timestamp %= oneHour;
    const mins = Math.floor(timestamp / oneMin);

    timestamp %= oneMin;
    const secs = Math.floor(timestamp / oneSec);

    this.observer.next({ days, hours, mins, secs });
    setTimeout(this.tickNext.bind(this), 1000);
  }
}

@Injectable({ providedIn: 'root' })
export class SharedService {
  constructor(private snackBar: MatSnackBar) {}

  public openSnackBar(title: string, msg: string = '', type: SNACKBARTYPE, duration?: number) {
    return this.snackBar.open(title, msg, {
      duration: duration || 5000,
      panelClass: [type],
    });
  }

  public createIntersectionObserver(el: any, callback: IntersectionObserverCallback) {
    const intersectionObserver = new IntersectionObserver(callback, { threshold: [1] });
    intersectionObserver.observe(el);
    return intersectionObserver;
  }

  public createCountDown(date: Date) {
    return new Observable((observer) => {
      new CountDown(observer, date);
    });
  }
}
