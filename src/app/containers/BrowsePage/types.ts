import { Player } from 'types/Player';

/* --- STATE --- */
export interface BrowsePageState {
  players: Player[];
}

export type ContainerState = BrowsePageState;
