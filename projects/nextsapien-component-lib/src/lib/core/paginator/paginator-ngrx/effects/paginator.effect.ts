import { Actions } from '@ngrx/effects';
import { Injectable } from '@angular/core';
@Injectable()
export class PaginatorEffects {
  constructor(private action$: Actions) {}
}
