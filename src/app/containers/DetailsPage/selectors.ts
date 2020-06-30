import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from './slice';

const selectDomain = (state: RootState) => state.detailsPage || initialState;

export const selectPlayer = createSelector(
  [selectDomain],
  detailsPageState => detailsPageState.player,
);

export const selectError = createSelector(
  [selectDomain],
  detailsPageState => detailsPageState.error,
);

export const selectLoading = createSelector(
  [selectDomain],
  detailsPageState => detailsPageState.loading,
);

export const selectPlayerDetails = createSelector(
  [selectDomain],
  detailsPageState => detailsPageState.playerDetails,
);
