import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from './slice';

const selectDomain = (state: RootState) => state.browsePage || initialState;

export const selectPlayerIdSearched = createSelector(
  [selectDomain],
  browsePageState => browsePageState.playerIdSearched,
);

export const selectError = createSelector(
  [selectDomain],
  browsePageState => browsePageState.error,
);

export const selectLoading = createSelector(
  [selectDomain],
  browsePageState => browsePageState.loading,
);

export const selectPlayerFounds = createSelector(
  [selectDomain],
  browsePageState => browsePageState.playerFounds,
);

export const selectPlayers = createSelector(
  [selectDomain],
  browsePageState => browsePageState.players,
);
