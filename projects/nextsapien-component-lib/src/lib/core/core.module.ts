import { CommonModule } from '@angular/common';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { throwIfAlreadyLoaded } from './module-import-check';
import { PaginatorEffects } from './paginator/paginator-ngrx/effects';
import * as fromPaginator from './paginator/paginator-ngrx/reducers';

@NgModule({
  imports: [CommonModule, StoreModule.forFeature(fromPaginator.paginatorFeatureKey, fromPaginator.reducers), EffectsModule.forFeature([PaginatorEffects])],
  declarations: [],
  exports: [],
})
export class CoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule,
  ) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
