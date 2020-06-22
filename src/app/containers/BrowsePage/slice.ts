import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { ContainerState, PlatformType, Player, PlayerErrorType } from './types';

// The initial state of the BrowsePage container
export const initialState: ContainerState = {
  playerIdSearched: 'lepicho',
  platform: PlatformType.ORIGIN,
  playerFounds: [],
  loading: false,
  players: [
    {
      id: 'Lordgenova',
      platform: PlatformType.ORIGIN,
    },
  ],
};

const browsePageSlice = createSlice({
  name: 'browsePage',
  initialState,
  reducers: {
    setPlayerId(state, action: PayloadAction<string>) {
      state.playerIdSearched = action.payload;
    },
    setPlatform(state, action: PayloadAction<PlatformType>) {
      state.platform = action.payload;
    },
    browsePlayers(state) {
      state.loading = true;
      state.playerFounds = [];
    },
    foundPlayers(state, action: PayloadAction<Player[]>) {
      state.playerFounds = action.payload;
      state.loading = false;
    },
    errorPlayers(state, action: PayloadAction<PlayerErrorType>) {
      state.error = action.payload;
      state.loading = false;
    },
    addPlayer(state, action: PayloadAction<Player>) {
      state.players.push(action.payload);
    },
  },
});

export const { actions, reducer, name: sliceKey } = browsePageSlice;
