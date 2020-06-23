import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { ContainerState, PlayerErrorType } from './types';
import { PlatformEnum } from 'types/PlatformEnum';
import { Player } from 'types/Player';

// The initial state of the SearchForm container
export const initialState: ContainerState = {
  playerIdSearched: 'lepicho',
  platform: PlatformEnum.ORIGIN,
  playerFounds: [],
  loading: false,
};

const searchFormSlice = createSlice({
  name: 'searchForm',
  initialState,
  reducers: {
    setPlayerId(state, action: PayloadAction<string>) {
      state.playerIdSearched = action.payload;
    },
    setPlatform(state, action: PayloadAction<PlatformEnum>) {
      state.platform = action.payload;
    },
    browsePlayers(state) {
      state.loading = true;
      state.playerFounds = [];
      state.error = undefined;
    },
    foundPlayers(state, action: PayloadAction<Player[]>) {
      state.playerFounds = action.payload;
      state.loading = false;
    },
    errorPlayers(state, action: PayloadAction<PlayerErrorType>) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { actions, reducer, name: sliceKey } = searchFormSlice;
