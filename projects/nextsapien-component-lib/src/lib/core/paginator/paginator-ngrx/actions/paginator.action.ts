import { createAction, props } from '@ngrx/store';

export const setCurrentEntityCount = createAction('[Paginator] Set Entity Count', props<{ paginator: { count: string; model: string } }>());

export const getCurrentEntityCount = createAction('[Job] Get current entity count');
