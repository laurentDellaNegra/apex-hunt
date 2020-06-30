import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { ContainerState } from './types';
import { Player } from 'types/Player';
import { PlatformEnum } from 'types/PlatformEnum';
import { PlayerOverview } from 'types/PlayerOverview';

// The initial state of the BrowsePage container
export const initialState: ContainerState = {
  players: [
    { id: 'lepicho', platform: PlatformEnum.ORIGIN },
    { id: 'Lordgenova', platform: PlatformEnum.ORIGIN },
    { id: 'K1rua', platform: PlatformEnum.ORIGIN },
    { id: 'hero0405', platform: PlatformEnum.ORIGIN },
  ],
  playersOverview: [],
};

const browsePageSlice = createSlice({
  name: 'browsePage',
  initialState,
  reducers: {
    addPlayer(state, action: PayloadAction<Player>) {
      // Add if player doesn't exists
      if (getPlayerIndex(state.players, action.payload) !== -1) return;
      state.players.push(action.payload);
    },
    loadPlayerOverview(state, action: PayloadAction<Player>) {
      //Check if exists
      if (getPlayerIndex(state.playersOverview, action.payload) !== -1) return;
      state.playersOverview.push({
        id: action.payload.id,
        platform: action.payload.platform,
        isLoading: true,
      });
    },
    foundPlayerOverview(state, action: PayloadAction<PlayerOverview>) {
      const index = getPlayerIndex(state.playersOverview, action.payload);
      if (index !== -1) {
        state.playersOverview[index] = {
          ...action.payload,
        };
      }
    },
  },
});

function getPlayerIndex(
  playersOverview: Player[],
  playerOverview: Player,
): number {
  return playersOverview.findIndex(
    p => p.id === playerOverview.id && p.platform === playerOverview.platform,
  );
}

export const { actions, reducer, name: sliceKey } = browsePageSlice;
