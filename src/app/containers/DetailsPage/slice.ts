import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { ContainerState, PlayerDetails } from './types';
import { Player } from 'types/Player';

// The initial state of the DetailsPage container
export const initialState: ContainerState = {
  loading: false,
};

const detailsPageSlice = createSlice({
  name: 'detailsPage',
  initialState,
  reducers: {
    setPlayer(state, action: PayloadAction<Player>) {
      state.player = action.payload;
    },
    loadDetails(state) {
      state.loading = true;
      state.error = '';
    },
    detailsLoaded(state, action: PayloadAction<PlayerDetails>) {
      state.playerDetails = action.payload;
      state.loading = false;
      state.error = '';
    },
    errorPlayerDetails(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { actions, reducer, name: sliceKey } = detailsPageSlice;
