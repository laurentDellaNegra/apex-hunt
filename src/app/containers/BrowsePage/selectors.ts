import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from './slice';

const selectDomain = (state: RootState) => state.browsePage || initialState;

export const selectBrowsePage = createSelector(
  [selectDomain],
  browsePageState => browsePageState,
);
