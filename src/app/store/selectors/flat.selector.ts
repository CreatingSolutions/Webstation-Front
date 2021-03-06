import {AppState} from '../index';
import {createSelector} from '@ngrx/store';

export const selectFlatState$ = (state: AppState) =>  state.flats;

export const selectFlats$ = createSelector(selectFlatState$, (flats) =>  flats);

export const selectFlatsLoading$ = createSelector(selectFlatState$, (flats) =>  flats.loading);

export const selectFlatsLoaded$ = createSelector(selectFlatState$, (flats) =>  flats.loaded);

export const selectFlatsData$ = createSelector(selectFlatState$, (flats) =>  flats.selectFlat);

export const selectFlatsLogs$ = createSelector(selectFlatState$, (flats) => flats.logs);
