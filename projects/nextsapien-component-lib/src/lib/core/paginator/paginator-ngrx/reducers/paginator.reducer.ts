import { createReducer, on } from '@ngrx/store';
import * as PaginatorActions from '../actions';

export const statusFeatureKey = 'paginator';

export interface State {}

export const initialState: State = {};

export const reducer = createReducer(
  initialState,
  on(PaginatorActions.setCurrentEntityCount, (state, { paginator }) => {
    const model = {};
    model[paginator.model] = paginator.count;
    return { ...state, ...model };
  }),
);

export const getPaginatorCount = (state: State) => {
  return state;
};
