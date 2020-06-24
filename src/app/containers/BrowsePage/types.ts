import { Player } from 'types/Player';
import { PlayerOverview } from 'types/PlayerOverview';

/* --- STATE --- */
export interface BrowsePageState {
  players: Player[];
  playersOverview: PlayerOverview[];
}

export type ContainerState = BrowsePageState;
