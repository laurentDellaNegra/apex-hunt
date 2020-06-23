import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from './slice';

const selectDomain = (state: RootState) => state.searchForm || initialState;

export const selectPlayerIdSearched = createSelector(
  [selectDomain],
  browsePageState => browsePageState.playerIdSearched,
);

export const selectPlatform = createSelector(
  [selectDomain],
  browsePageState => browsePageState.platform,
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
