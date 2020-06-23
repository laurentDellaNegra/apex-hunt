import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from './slice';

const selectDomain = (state: RootState) => state.browsePage || initialState;

export const selectPlayers = createSelector(
  [selectDomain],
  browsePageState => browsePageState.players,
);
