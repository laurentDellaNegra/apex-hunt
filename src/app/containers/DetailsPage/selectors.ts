import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from './slice';

const selectDomain = (state: RootState) => state.detailsPage || initialState;

export const selectDetailsPage = createSelector(
  [selectDomain],
  detailsPageState => detailsPageState,
);
