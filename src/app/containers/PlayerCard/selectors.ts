import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from './slice';

const selectDomain = (state: RootState) => state.playerCard || initialState;

export const selectPlayerCard = createSelector(
  [selectDomain],
  playerCardState => playerCardState,
);
