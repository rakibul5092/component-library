import * as fromRoot from '../../../reducers';
import * as fromPaginator from './paginator.reducer';
import { Action, combineReducers, createSelector, createFeatureSelector } from '@ngrx/store';

export const paginatorFeatureKey = 'paginator';

export interface PaginatorState {
  [fromPaginator.statusFeatureKey]: fromPaginator.State;
}

export interface State extends fromRoot.State {
  [paginatorFeatureKey]: PaginatorState;
}

export function reducers(state: PaginatorState | undefined, action: Action) {
  return combineReducers({
    [fromPaginator.statusFeatureKey]: fromPaginator.reducer,
  })(state, action);
}

export const selectPaginatorFeature = createFeatureSelector<State, PaginatorState>(paginatorFeatureKey);

export const selectPaginatorState = createSelector(selectPaginatorFeature, (state: PaginatorState) => state[fromPaginator.statusFeatureKey]);

export const selectPaginators = createSelector(selectPaginatorState, fromPaginator.getPaginatorCount);
