import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { ContainerState } from './types';
import { Player } from 'types/Player';
import { PlatformEnum } from 'types/PlatformEnum';

// The initial state of the BrowsePage container
export const initialState: ContainerState = {
  players: [
    {
      id: 'Lordgenova',
      platform: PlatformEnum.ORIGIN,
    },
  ],
};

const browsePageSlice = createSlice({
  name: 'browsePage',
  initialState,
  reducers: {
    addPlayer(state, action: PayloadAction<Player>) {
      // Add if player doesn't exists
      if (!state.players.find(p => p.id === action.payload.id)) {
        state.players.push(action.payload);
      }
    },
  },
});

export const { actions, reducer, name: sliceKey } = browsePageSlice;
